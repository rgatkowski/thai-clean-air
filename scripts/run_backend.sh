#! /bin/bash

set -e  # fail fast

uvicorn backend.main:app --port ${PORT} --host 0.0.0.0
