# ===================================
# First stage: Build base image with Python requirements
#
# Use an Pytorch container as a parent image
FROM pytorch/pytorch:latest AS webapp_base
# Set the working directory to /app
WORKDIR /app
# Install Python modules specified in requirements.txt,
# then purge build dependencies to keep image size to minimum
# - Packages needed for running psycopg2: postgresql-libs
# - Packages needed for building psycopg2: gcc, musl-dev, postgresql-dev
ADD backend/requirements.txt .
RUN apt-get update && \
  # apt-get install postgresql-libs gcc musl-dev postgresql-dev && \
  # apt-get install libpq-dev python-dev && \
  python3 -m pip install --upgrade pip && \
  python3 -m pip install psycopg2-binary && \
  python3 -m pip install -r requirements.txt
  # apt-get purge gcc musl-dev postgresql-dev

# ===================================
# Second stage: Build frontend
#
# Use an official NodeJS 10 runtime as a parent image
FROM node:10-alpine AS webapp_frontend_builder
# Set the working directory to /build
WORKDIR /build
# Install Angular CLI
RUN npm install -g @angular/cli --unsafe-perm
# Install Node modules specified in frontend/package.json
ADD frontend/package*.json frontend/
RUN (cd frontend && npm install --save-dev --loglevel=error)
# Build frontend,
# then remove node modules only required for building
ADD frontend/ frontend/
RUN (cd frontend && ng build)

# =================================================
# Final stage: Add frontend build and backend code to base image
#
# Use above base image with Python dependencies as base
FROM webapp_base
# Set the working directory to /app
WORKDIR /app
# Copy frontend build
COPY --from=webapp_frontend_builder /build/frontend/dist frontend/dist/
# Copy backend directory contents into the container
ADD backend backend/
# Make port 80 available to the world outside this container
EXPOSE 80
# Define location of flask app file
ENV FLASK_APP=backend/app.py
ENV FLASK_ENV=development
ENV LC_ALL=C.UTF-8
ENV LANG=C.UTF-8
# Run flask when the container launches
CMD ["flask", "run", "--host=0.0.0.0", "--port=80"]