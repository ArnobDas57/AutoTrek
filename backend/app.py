from fastapi import FastAPI
from fastapi.responses import JSONResponse, StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from dotenv import load_dotenv
import ollama
from fpdf import FPDF
import os
from io import BytesIO

# Load environment variables
load_dotenv()

app = FastAPI()

# CORS config
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to frontend URL in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Models
class ItineraryRequest(BaseModel):
    days: int = Field(..., ge=1, le=30)  # between 1 and 30 days
    location: str
    month: str


class PDFRequest(BaseModel):
    itinerary: str


@app.get("/")
def root():
    return {"status": "ok"}


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
        response = ollama.chat(model="llama3.1:8b", messages=messages)
        content = response["message"]["content"]
        return {"itinerary": content}
    except Exception as e:
        return JSONResponse(
            content={"error": f"⚠️ Unable to generate itinerary. {str(e)}"},
            status_code=500,
        )


@app.post("/pdf")
async def create_pdf(data: PDFRequest):
    try:
        pdf = FPDF()
        pdf.add_page()
        pdf.set_font("Arial", size=12)
        pdf.multi_cell(0, 10, data.itinerary.strip())

        # Return PDF in-memory
        pdf_bytes = pdf.output(dest="S").encode("latin-1")
        return StreamingResponse(
            BytesIO(pdf_bytes),
            media_type="application/pdf",
            headers={"Content-Disposition": "attachment; filename=itinerary.pdf"},
        )
    except Exception as e:
        return JSONResponse(
            content={"error": f"⚠️ PDF generation failed. {str(e)}"}, status_code=500
        )
