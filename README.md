# YellowMeCodeChallenge
This project is based on the YellowMe Code Challange for backend https://github.com/yellowme/interview/tree/master/back_end

## Backend

A Flask project that expose 2 endpoints / for POST and GET method and /[shorted_url] for GET method.

* Endpoints:
  1. / (GET): List all the stores shorted URL
  2. / (POST): Receive either a list of names and urls o a single values, backend use an external service to short the URL
  3. /[shorted_url] (GET): Redirect the response to the actual URL refered to the Shorted URL

* Code: https://github.com/R3SWebDevelopment/YellowMeCodeChallenge/tree/main/container/backend/src/shorted_url

## Frontend

A single page app that display the list of the stored URL retreived by backend, there are also 3 options on the top of the page.

1. Add a single URL related to a name
2. Add a batch of urls, the format of each row should be name then the url separetad by a comma
3. Load a text file with a batch of urls. The format should be the same as point 2

* Code: https://github.com/R3SWebDevelopment/YellowMeCodeChallenge/tree/main/container/frontend/src/shorted_urls/src

## Requirements
1. Docker: https://docs.docker.com/get-docker/
2. Docker-Compose: https://docs.docker.com/compose/install/

## Install

```
cd container
docker-compose build
```

## Run

```
cd container
docker-compose up
```

Open Browser and visit http://127.0.0.1/