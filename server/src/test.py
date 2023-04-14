"""Test environment variables."""
import os

connection_string = os.getenv("CONNECTION_STRING")

if len(connection_string) > 0:
    print("Connection string is not empty")
else:
    print("Connection string is empty")

# scramble the connection string
scrambled = connection_string[0:10] + "..." + connection_string[-10:]
print(f"Connection string: {scrambled.upper()}")
