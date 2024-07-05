from flask import Flask, jsonify, request
from flask_cors import CORS
from app.routes import api
from config import engine, Base
import time
from sqlalchemy.exc import OperationalError

app = Flask(__name__)
CORS(app)

app.register_blueprint(api, url_prefix='/api')

Base.metadata.create_all(bind=engine)

@app.after_request
def add_cors_headers(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

@app.errorhandler(Exception)
def handle_exception(e):
    return jsonify({'error': 'Unexpected Error', 'message': str(e)}), 500



def wait_for_db(engine, retries=5, delay=2):
    while retries > 0:
        try:
            # Try to connect to the database
            with engine.connect() as conn:
                return
        except OperationalError:
            retries -= 1
            print(f"Database not ready, retrying in {delay} seconds...")
            time.sleep(delay)
    raise Exception("Database not available")



if __name__ == '__main__':
    wait_for_db(engine)  # Ensure database is ready
    app.run(debug=True, host='127.0.0.1', port=5000)  
