FROM public.ecr.aws/lambda/python:3.8

COPY ./requirements.txt .

RUN  pip3 install -r requirements.txt --target "${LAMBDA_TASK_ROOT}" -U --no-cache-dir

COPY ./src ${LAMBDA_TASK_ROOT}

CMD [ "app.handler" ]