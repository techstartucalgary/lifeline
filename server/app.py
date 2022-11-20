import uvicorn
from fastapi import FastAPI
from handlers import calendarHandler

app = FastAPI()


@app.get("/calendarJson")
def showCalendar():
    return calendarHandler.getCalendarJson()


if __name__ == "__main__":
    uvicorn.run("app:app", host="127.0.0.1", port=8000)
