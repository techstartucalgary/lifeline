from dotenv.main import load_dotenv
import os
from pymongo import MongoClient

# Getting the connection string
load_dotenv()
connection_string = os.environ["CONNECTION_STRING"]

# Defining a MongoDB client instance
client = MongoClient(connection_string)

# DB name
db = client["database1"]

# Referencing the collection
courses = db["courses"]


def insert_course(sha: str, course_str: str):
    course = {"sha": sha, "course_str": course_str}
    result = courses.insert_one(course)
    print("Course inserted with ID:", result.inserted_id)


def query_course(sha: str):
    course = courses.find_one({"sha": sha})
    if course:
        print("Found a cached course with ID:", course["_id"])
        return course["course_str"]
    else:
        print("Didn't find a cached course")
        return None
