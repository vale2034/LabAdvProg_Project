# Usa un'immagine base per Python
FROM python:3.10-slim

# Imposta la directory di lavoro nel container
WORKDIR /backend

# Copia il file dei requisiti
COPY requirements.txt .

# Installa le dipendenze
RUN pip install --no-cache-dir -r requirements.txt

# Copia il resto del codice dell'app
COPY . .

# Esponi la porta su cui Flask sta girando
EXPOSE 5000

# Comando per eseguire l'app
CMD ["python", "server.py"]
