#!/bin/bash

docker build -t server-image .
docker tag server-image:latest 452130394449.dkr.ecr.us-west-2.amazonaws.com/lifeline-server:latest
fingerprint=$(docker push 452130394449.dkr.ecr.us-west-2.amazonaws.com/lifeline-server:latest \
  | grep -oP 'sha256:\w{64}')

echo $fingerprint

aws lambda update-function-code --function-name test-docker --image-uri 452130394449.dkr.ecr.us-west-2.amazonaws.com/lifeline-server@$fingerprint
  