"""Tests for the server. Run with `pytest test_app.py -s` to see print statements"""

import json

from fastapi.testclient import TestClient
from handlers import calendar_handler
from main import app

EXPECTEDCALENDARJSON = None
with open("data/calendar.json", encoding="utf8") as stream:
    EXPECTEDCALENDARJSON = json.load(stream)


client = TestClient(app)


def test_handlers():
    """tests handler functions"""
    assert calendar_handler.get_calendar_json() == EXPECTEDCALENDARJSON


def test_api():
    """tests api routes"""
    response = client.get("/test-calendar-json")
    assert response.status_code == 200
    assert response.json() == EXPECTEDCALENDARJSON


def test_one_expected_outline():
    """Sends a single outline PDF to the endpoint and checks that the response is correct.
    If this test fails but the status code is 200, check that the expected.json file is up
    to date with the latest parsing algorithm."""

    base_path = "../test-data/CPSC331"

    with open(f"{base_path}/CPSC331.pdf", "rb") as file:
        request_data = {"outline_file": ("CPSC331.pdf", file, "application/pdf")}
        response = client.post("/files", files=request_data)

    with open(f"{base_path}/expected.json", "r", encoding="utf8") as file:
        expected_response = json.load(file)

    assert response.status_code == 200
    assert response.json() == expected_response

def test_bad_file():
    """Sends a bad file to the endpoint and checks that the response is correct"""
    with open("./data/course_codes.pkl", "rb") as file:  # not a pdf
        request_data = {"outline_file": ("app.pdf", file, "application/pdf")}
        response = client.post("/files", files=request_data)

    assert response.status_code == 422


def test_too_large_file():
    """Sends a file that is too large to the endpoint and checks that the response is correct"""
    with open("../test-data/too-large2.pdf", "rb") as file:
        request_data = {"outline_file": ("CPSC331.pdf", file, "application/pdf")}
        response = client.post("/files", files=request_data)

    assert response.status_code == 413
