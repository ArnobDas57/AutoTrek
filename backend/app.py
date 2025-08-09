from fastapi import FastAPI
from fastapi.responses import JSONResponse, StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import ollama
from fpdf import FPDF
from io import BytesIO

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI()

# CORS configuration (adjust origins as needed)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Pydantic models
class ItineraryRequest(BaseModel):
    days: int
    location: str
    month: str


class PDFRequest(BaseModel):
    itinerary: str


# Endpoint: Generate Itinerary
@app.post("/itinerary")
async def generate_itinerary(data: ItineraryRequest):
    messages = [
        {"role": "system", "content": "You are a helpful travel assistant."},
        {
            "role": "user",
            "content": f"Generate a {data.days}-day travel itinerary for {data.location} in {data.month}.",
        },
        {
            "role": "user",
            "content": "Include morning, afternoon, and evening activity suggestions with food options.",
        },
        {
            "role": "user",
            "content": "Ensure popular and offbeat spots are covered with specific timings. Please ignore to display price of anything.",
        },
    ]

    try:
        response = ollama.chat(model="llama3:8b", messages=messages)
        content = response["message"]["content"]
        return {"itinerary": content}
    except Exception as e:
        return JSONResponse(
            content={"error": f"⚠️ Unable to generate itinerary. {str(e)}"},
            status_code=500,
        )


# Endpoint: Generate PDF
@app.post("/pdf")
async def create_pdf(data: PDFRequest):
    try:
        pdf = FPDF()
        pdf.add_page()
        pdf.set_font("Arial", size=12)
        pdf.multi_cell(0, 10, data.itinerary)

        # Save PDF to memory buffer
        pdf_buffer = BytesIO()
        pdf.output(pdf_buffer)
        pdf_buffer.seek(0)

        return StreamingResponse(
            pdf_buffer,
            media_type="application/pdf",
            headers={"Content-Disposition": "attachment; filename=itinerary.pdf"},
        )

    except Exception as e:
        return JSONResponse(
            content={"error": f"⚠️ PDF generation failed. {str(e)}"},
            status_code=500,
        )
