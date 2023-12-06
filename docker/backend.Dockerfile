FROM python:3.10-slim

ENV PYTHONUNBUFFERED=1
WORKDIR /app

COPY ./backend .
COPY ./scripts scripts

RUN pip install --no-deps --no-cache-dir -r requirements.txt

CMD ["./scripts/run_backend.sh"]
