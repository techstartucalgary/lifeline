"""Entry point for the server"""

from os import environ
import uvicorn
from fastapi import FastAPI, File, UploadFile, Response
from fastapi.middleware.cors import CORSMiddleware
from mangum import Mangum
from handlers import calendar_handler, file_handler

IS_IN_PROD = "LAMBDA_TASK_ROOT" in dict(environ)

app = FastAPI(
    title="Lifeline Server",
    description="Server for the Lifeline project",
    version="0.1.0",
    docs_url="/docs" if not IS_IN_PROD else None,
    redoc_url="/redoc" if not IS_IN_PROD else None,
)
handler = Mangum(app)


origins = (
    ["https://lifeline.techstartucalgary.com"]
    if IS_IN_PROD
    else ["http://localhost:3000", "http://127.0.0.1:3000"]
)


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


@app.post("/files", status_code=200)
async def get_deadlines(response: Response, outline_file: UploadFile = File(...)):
    """Returns the extracted dates and info from the uploaded file"""
    return file_handler.handle_file(outline_file, response)


if __name__ == "__main__":
    uvicorn.run("app:app", host="127.0.0.1", port=8000)
