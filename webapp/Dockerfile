# Use an official Python 3.7 runtime as a parent image
FROM python:3.7-alpine

# Set the working directory to /app
WORKDIR /app

# Install Angular CLI and requirements for building frontend
RUN apk add nodejs npm && \
  npm install -g @angular/cli

# Install any needed packages specified in requirements.txt,
# then purge build dependencies to keep image size to minimum
# - Packages needed for running psycopg2: postgresql-libs
# - Packages needed for building psycopg2: gcc, musl-dev, postgresql-dev
ADD backend/requirements.txt .
RUN apk update && \
  apk add postgresql-libs && \
  apk add --virtual .build-deps gcc musl-dev postgresql-dev && \
  python3 -m pip install --upgrade pip && \
  python3 -m pip install --trusted-host pypi.python.org -r requirements.txt --no-cache-dir && \
  apk --purge del .build-deps

# Build frontend
ADD frontend/ frontend/
RUN (cd frontend && ng build)

# Copy backend directory contents into the container
ADD backend backend/

# Make port 80 available to the world outside this container
EXPOSE 80

# Define location of flask app file
ENV FLASK_APP=backend/app.py
# ENV FLASK_ENV=development

# Run app.py when the container launches
CMD ["flask", "run", "--host=0.0.0.0", "--port=80"]