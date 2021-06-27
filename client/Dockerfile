FROM python

WORKDIR /app

COPY requirements.txt .
COPY main.py .
RUN pip install -r requirements.txt
RUN apt update
RUN apt install autossh -y

CMD ["python", "main.py"]
