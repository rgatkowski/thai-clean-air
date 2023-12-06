#! /bin/bash

set -e  # fail fast

uvicorn backend.main.asgi:app --port ${PORT} --host 0.0.0.0 --reload
