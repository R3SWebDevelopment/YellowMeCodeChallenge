FROM python:3.6
ADD ./src /project
CMD mkdir /instance
COPY ./instance/shorted.sqlite /instance/shorted.sqlite
WORKDIR /project
RUN pip install -r requirements.txt