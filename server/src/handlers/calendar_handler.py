"""Handles sending the calendar json to the client"""

import json


def get_calendar_json():
    """retrieves the JSON for the Calendar"""
    with open("data/calendar.json", encoding="utf8") as stream:
        generated_calendar = json.load(stream)
        return generated_calendar
