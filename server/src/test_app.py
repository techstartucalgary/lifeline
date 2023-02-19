"""Tests for the server. Run with `pytest test_app.py -s` to see print statements`"""

import json
from pathlib import Path
from fastapi.testclient import TestClient
from handlers import calendar_handler

from app import app

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
        request_data = {"outline_files": ("CPSC331.pdf", file, "application/pdf")}
        response = client.post("/files", files=request_data)

    with open(f"{base_path}/expected.json", "r", encoding="utf8") as file:
        expected_response = json.load(file)

    assert response.status_code == 200
    assert response.json() == expected_response


def test_many_outlines():
    """Similar to test_one_expected_outline, but sends many outlines to the
    endpoint and only checks that the status code is 200."""
    files = []

    # Iterate over 5 files in ../test-data
    count = 0
    for path in Path("../test-data").iterdir():
        if count == 5:
            break
        if not path.is_dir():
            continue

        course_name = path.name
        with open(f"../test-data/{course_name}/{course_name}.pdf", "rb") as file:
            file_content = file.read()
            files.append(("outline_files", file_content))
        count += 1

    print(files)

    response = client.post("/files", files=files)
    assert response.status_code == 200
