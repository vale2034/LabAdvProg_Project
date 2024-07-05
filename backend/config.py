import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# Esempio di URL del database per Docker e Locale
DOCKERIZED = os.getenv('DOCKERIZED', 'false').lower() in ('true', '1')

# Configura la connessione al database PostgreSQL
if DOCKERIZED:
    SQLALCHEMY_DATABASE_URL = "postgresql://postgres:valedb@db:5432/ecommerce"
else:
    SQLALCHEMY_DATABASE_URL = "postgresql://postgres:valedb@localhost/ecommerce"

# Crea un'istanza dell'engine di SQLAlchemy
engine = create_engine(SQLALCHEMY_DATABASE_URL)

# Crea un sessionmaker per la gestione delle sessioni del database
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

