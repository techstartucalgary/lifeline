#!/bin/bash

set -xeuo pipefail

# Define the URL of the API endpoint
API_URL="https://rj6crp3mqwnq6vskrxd5umir4a0tgcqv.lambda-url.us-west-2.on.aws/test-calendar-json"

# Define the path to the expected response file
EXPECTED_RESPONSE_FILE="./src/data/calendar.json"

# Send a GET request to the API and store the response in a variable
API_RESPONSE=$(curl --silent --show-error --location --request GET "${API_URL}")

# Compare the API response to the expected response file
if [ "$(echo "${API_RESPONSE}" | jq -cS .)" = "$(cat ${EXPECTED_RESPONSE_FILE} | jq -cS .)" ]; then
    echo "API response matches the expected response"
    exit 0
else
    echo "API response does not match the expected response"
    exit 1
fi
