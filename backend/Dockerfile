FROM python:3.7.7
ENV PYTHONUNBUFFERED 1

RUN mkdir /backend
WORKDIR /backend
COPY requirements.txt /backend/
EXPOSE 8000
RUN pip install -r requirements.txt
COPY . /backend/
CMD python manage.py makemigrations
CMD python manage.py migrate