from config import engine, Base
from app.models import Product, User, CartItem, Order

try:
    # Crea tutte le tabelle definite nei modelli
    Base.metadata.create_all(bind=engine)
    print("Tabelle create con successo.")
except Exception as e:
    print(f"Si è verificato un errore durante la creazione delle tabelle: {str(e)}")
