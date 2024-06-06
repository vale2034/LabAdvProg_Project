from flask import Flask
from app.routes import api  # Importa il blueprint delle rotte API
from config import engine, Base

app = Flask(__name__)

# Registra il blueprint delle rotte API
app.register_blueprint(api, url_prefix='/api')

Base.metadata.create_all(bind=engine)

if __name__ == '__main__':
    app.run(debug=True)
