FROM python:3.7.2

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        mysql-client \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app
COPY requirements.txt ./
RUN pip3 install -r requirements.txt
COPY . .

EXPOSE 8000,3306,443
CMD ["python3", "manage.py", "runserver", "0.0.0.0:8000"]
