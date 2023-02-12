"""Entry point for the server"""

from typing import List
import uvicorn
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from handlers import calendar_handler, file_handler

app = FastAPI()

origins = [
    "http://localhost:3000",
    "https://localhost:3000",
    "http://127.0.0.1:3000",
    "https://lifeline.techstartucalgary.com",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/test-calendar-json")
async def show_calendar():
    """sends a test json to client"""
    return calendar_handler.get_calendar_json()


@app.post("/files")
async def get_deadlines(outline_files: List[UploadFile] = File(...)):
    """Returns the extracted dates from the uploaded file(s)"""
    return file_handler.handle_files(outline_files)


if __name__ == "__main__":
    uvicorn.run("app:app", host="127.0.0.1", port=8000)
