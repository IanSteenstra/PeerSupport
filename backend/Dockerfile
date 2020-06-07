FROM python:3.7.7

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        postgresql-client \
    && rm -rf /var/lib/apt/lists/*

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /therapynow/backend
RUN pip install --upgrade pip
COPY requirements.txt /therapynow/backend
RUN pip install -r requirements.txt

COPY . /therapynow/backend/

EXPOSE 8000
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]