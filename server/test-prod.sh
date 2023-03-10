#!/bin/bash

set -xeuo pipefail

# Define the URL of the API
API_URL="https://rj6crp3mqwnq6vskrxd5umir4a0tgcqv.lambda-url.us-west-2.on.aws"

# Define the path to the expected response file
EXPECTED_RESPONSE_FILE="./test-data/CPSC331/expected.json"

# Send a request to the API
cp ./test-data/CPSC331/CPSC331.pdf ./CPSC331.pdf
ls -l ./CPSC331.pdf # Size should be 86914 bytes
API_RESPONSE=$(curl --silent --show-error --location --request POST "${API_URL}/files" \
  -H 'accept: application/json' \
  -H 'Content-Type: multipart/form-data' \
  -F 'outline_file=@CPSC331.pdf;type=application/pdf')
rm ./CPSC331.pdf

# Compare the API response to the expected response file
if [ "$(echo "${API_RESPONSE}" | jq -cS .)" = "$(cat ${EXPECTED_RESPONSE_FILE} | jq -cS .)" ]; then
    echo "API response matches the expected response"
    exit 0
else
    echo "API response does not match the expected response"
    exit 1
fi
