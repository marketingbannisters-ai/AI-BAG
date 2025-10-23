FROM python:3.12.10-slim

WORKDIR /AI-BAG

COPY requirements.txt /AI-BAG
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8080

CMD ["sh", "-c", "uvicorn src.backend.app:app --host 0.0.0.0 --port ${PORT:-8080}"]