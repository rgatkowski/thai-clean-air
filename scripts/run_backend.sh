#! /bin/bash

set -e  # fail fast

uvicorn main:app --port ${PORT} --host 0.0.0.0 --reload
