import uvicorn
from fastapi import FastAPI, File, UploadFile
from handlers import calendarHandler

app = FastAPI()


@app.get("/calendarJson")
async def showCalendar():
    return calendarHandler.getCalendarJson()


@app.post("/sendFile")
async def sendOutlineFile(outlineFile: UploadFile = File(...)):
    return {"The File that you just passed is ": outlineFile.filename}


if __name__ == "__main__":
    uvicorn.run("app:app", host="127.0.0.1", port=8000)
