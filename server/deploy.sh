#!/bin/bash

# Authorize docker
# aws ecr get-login-password --region us-west-2 | docker login --username AWS --password-stdin 452130394449.dkr.ecr.us-west-2.amazonaws.com

# Build the image
docker build -t server-image . && \

# Tag the image
docker tag server-image:latest 452130394449.dkr.ecr.us-west-2.amazonaws.com/lifeline-server:latest && \

# Push the image to ECR and get the image digest
fingerprint=$(docker push 452130394449.dkr.ecr.us-west-2.amazonaws.com/lifeline-server:latest \
  | grep -oP 'sha256:\w{64}') && \

echo $fingerprint && \

# Update the lambda function with the new image
aws lambda update-function-code \
  --function-name test-docker \
  --image-uri 452130394449.dkr.ecr.us-west-2.amazonaws.com/lifeline-server@$fingerprint
