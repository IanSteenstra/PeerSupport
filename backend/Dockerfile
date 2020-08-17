FROM python:3.7.7

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /peersupport/backend
RUN pip install --upgrade pip
COPY requirements.txt /peersupport/backend
RUN pip install -r requirements.txt

COPY . /peersupport/backend/

EXPOSE 8000
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]