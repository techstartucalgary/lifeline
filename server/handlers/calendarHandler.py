import json

def getCalendarJson():
    with open('data/calendar.json') as stream:
        generatedCalendar = json.load(stream)
        return generatedCalendar