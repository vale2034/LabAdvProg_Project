from sqlalchemy import create_engine
from sqlalchemy import text
from sqlalchemy.orm import sessionmaker
from config import SQLALCHEMY_DATABASE_URL  # Importa l'URL del database dalla configurazione

# Crea un'istanza dell'engine di SQLAlchemy
engine = create_engine(SQLALCHEMY_DATABASE_URL)

# Crea un sessionmaker per la gestione delle sessioni del database
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def test_database_connection():
    try:
        # Crea una sessione del database
        db = SessionLocal()
        
        # Esegui una query di esempio per verificare la connessione
        result = db.execute(text('SELECT version();'))
        db_version = result.scalar()
        
        print("Connessione al database riuscita!")
        print("Versione del database:", db_version)
        
    except Exception as e:
        print("Errore durante la connessione al database:", e)

if __name__ == "__main__":
    test_database_connection()
