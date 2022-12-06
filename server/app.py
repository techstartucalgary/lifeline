"""Uvicorn is an ASGI web server implementation for Python."""
import uvicorn

from fastapi import FastAPI, File, UploadFile
from handlers import calendar_handler

app = FastAPI()


@app.get("/test-calendar-json")
async def show_calendar():
    """sends a test json to client"""
    return calendar_handler.get_calendar_json()


@app.post("/files")
async def send_outline_file(outline_file: UploadFile = File(...)):
    """sends pdf file to server"""
    return {"The File that you just passed is ": outline_file.filename}


if __name__ == "__main__":
    uvicorn.run("app:app", host="127.0.0.1", port=8000)
