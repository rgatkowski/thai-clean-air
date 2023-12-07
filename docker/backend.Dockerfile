FROM python:3.10-slim

ENV PYTHONUNBUFFERED=1
WORKDIR /app

COPY ./backend/requirements.txt .
RUN pip install -r requirements.txt

COPY ./backend .
COPY ./scripts scripts

CMD ["./scripts/run_backend.sh"]
