"""Test environment variables."""
import os

from dotenv.main import load_dotenv

load_dotenv()

print("The connection string is:")
print(os.getenv("CONNECTION_STRING"))
