from pymongo import MongoClient

# Defining a MongoDB client instance
client = MongoClient("SOMETHING SOMETHING")

# DB name
db = client["database1"]

# Referencing the collection
calendars = db["calendars"]


def insert_calendar(sha: str, calendar_str: str):
    calendar = {"sha": sha, "calendar_str": calendar_str}
    result = calendars.insert_one(calendar)
    print("Calendar inserted with ID:", result.inserted_id)


def query_calendar(sha: str):
    calendar = calendars.find_one({"sha": sha})
    if calendar:
        print("Found a cached calendar with ID:", calendar["_id"])
        return calendar["calendar_str"]
    else:
        print("Didn't find a cached calendar")
        return None
