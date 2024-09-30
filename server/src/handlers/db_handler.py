# """Handler for the database"""
# import json

# from dotenv.main import load_dotenv
# from pymongo import MongoClient

# # Getting the connection string
# load_dotenv()
# pylint ignore next line naming and line length

# # Defining a MongoDB client instance
# client = MongoClient(connection_string)

# # DB name
# db = client["database1"]

# # Referencing the collection
# courses = db["courses"]


# def insert_course_into_db(sha: str, course_str: str):
#     """Inserts a course into the database"""
#     course = {"sha": sha, "course_str": course_str}
#     result = courses.insert_one(course)
#     print("Course inserted with ID:", result.inserted_id)


# def query_course_from_db(sha: str):
#     """Queries the database for a course with the given sha"""
#     course = courses.find_one({"sha": sha})
#     if course:
#         print("Found a cached course with ID:", course["_id"])
#         return json.loads(course["course_str"])
#     print("Didn't find a cached course")
#     return None
