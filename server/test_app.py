import json
from .handlers import calendarHandler
from fastapi.testclient import TestClient

from .app import app

expectedCalendarJson = None
with open('data/calendar.json') as stream:
        expectedCalendarJson = json.load(stream)


client = TestClient(app)

def test_handlers(): # Here we can test handler functions
    assert calendarHandler.getCalendarJson() == expectedCalendarJson

def test_api():  # To test the api routes   
    response = client.get('/calendarJson')
    assert response.status_code == 200
    assert response.json() == expectedCalendarJson
    