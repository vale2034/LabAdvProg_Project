from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# Configura la connessione al database PostgreSQL
SQLALCHEMY_DATABASE_URL = "postgresql://postgres:valedb@localhost/ecommerce"

# Crea un'istanza dell'engine di SQLAlchemy
engine = create_engine(SQLALCHEMY_DATABASE_URL)

# Crea un sessionmaker per la gestione delle sessioni del database
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

