FROM python:3.10-slim

ENV PYTHONUNBUFFERED=1
WORKDIR /app

COPY ./backend .
COPY ./scripts scripts

RUN pip install -r requirements.txt

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
