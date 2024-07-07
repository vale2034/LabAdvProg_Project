import os
import time
from sqlalchemy import create_engine,exc
from sqlalchemy.orm import sessionmaker, declarative_base

# Esempio di URL del database per Docker e Locale
DOCKERIZED = os.getenv('DOCKERIZED', 'false').lower() in ('true', '1')

# Configura la connessione al database PostgreSQL
if DOCKERIZED:
    SQLALCHEMY_DATABASE_URL = "postgresql://postgres:valedb@db:5432/ecommerce"
else:
    SQLALCHEMY_DATABASE_URL = "postgresql://postgres:valedb@localhost/ecommerce"

# Crea un'istanza dell'engine di SQLAlchemy


for _ in range(10):  # Try to connect 10 times
    try:
        engine = create_engine(SQLALCHEMY_DATABASE_URL)
        connection = engine.connect()
        connection.close()
        print("Database connection established")
        break
    except exc.OperationalError:
        print("Database connection failed, retrying in 5 seconds...")
        time.sleep(5)
else:
    print("Failed to connect to the database after multiple attempts")
    exit(1)

# Crea un sessionmaker per la gestione delle sessioni del database
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

