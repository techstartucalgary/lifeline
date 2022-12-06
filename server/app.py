import uvicorn
from fastapi import FastAPI, File, UploadFile
from handlers import calendarHandler
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:3000/upload",
    "https://localhost:3000/upload",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/calendarJson")
async def showCalendar():
    return calendarHandler.getCalendarJson()


@app.post("/files")
async def sendOutlineFile(outlineFile: UploadFile = File(...)):
    return {"The File that you just passed is ": outlineFile.filename}


if __name__ == "__main__":
    uvicorn.run("app:app", host="127.0.0.1", port=8000)
