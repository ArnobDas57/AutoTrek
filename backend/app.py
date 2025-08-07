from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.testclient import TestClient
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import ollama
from fpdf import FPDF

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/itinerary")
def generate_itinerary(location, days, month):
    messages = [
        {"role": "system", "content": "You are a helpful Travel assistant."},
        {
            "role": "user",
            "content": f"Generate a {days}-day travel itinerary for { location } in { month }.",
        },
        {
            "role": "user",
            "content": "Include morning, afternoon, and evening activity suggestions with food options",
        },
        {
            "role": "user",
            "content": "Ensure popular and offbeat spots are covered with specific timings. Please ignore to display price of anything",
        },
    ]

    try:
        response = ollama.chat(model="llamama3.1:8b", messages=messages)
        return response["message"]["content"]
    except Exception as e:
        return "⚠️ Unable to generate itinerary. Please try again."


@app.post("/pdf")
def create_pdf(itinerary):
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", size=12)
    pdf.multi_cell(0, 10, itinerary)

    return pdf.output(dest="S").encode("utf-8")
