Junction project directory

## Setup

1. Add execution permissions to **run.py**: \
  `chmod +x run.py`

2. Install **run.py** dependencies: \
  `pip install run_requirements.txt`

## Building, running etc.

Build all containers: \
  `./run.py build`

Build specific containers (comma-separated): \
  `./run.py build --services=webapp`

Run containers: \
  `./run.py compose` or `docker-compose up`

Check running containers: \
  `docker ps`

Clean up (remove running containers etc.): \
  `./run.py cleanup`
