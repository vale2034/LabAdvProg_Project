import os
import time
from sqlalchemy import create_engine,exc
from sqlalchemy.orm import sessionmaker, declarative_base




SQLALCHEMY_DATABASE_URL = "postgresql://user_db:pass_db@host.docker.internal:5432/name_db"
 

SQLALCHEMY_DATABASE_URL = os.getenv("SQLALCHEMY_DATABASE_URL")
if not SQLALCHEMY_DATABASE_URL:
    raise ValueError("Missing environment variable: SQLALCHEMY_DATABASE_URL")


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

