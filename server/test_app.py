"""package for working with json"""
import json
from handlers import calendarHandler
from fastapi.testclient import TestClient

from app import app

EXPECTEDCALENDARJSON = None
with open("data/calendar.json", encoding="utf8") as stream:
    EXPECTEDCALENDARJSON = json.load(stream)


client = TestClient(app)


def test_handlers():  # Here we can test handler functions
    """tests handler functions"""
    assert calendarHandler.get_calendar_json() == EXPECTEDCALENDARJSON


def test_api():  # To test the api routes
    """tests api routes"""
    response = client.get("/calendarJson")
    assert response.status_code == 200
    assert response.json() == EXPECTEDCALENDARJSON
