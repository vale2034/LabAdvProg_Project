from flask import Flask, jsonify
from flask_cors import CORS
from app.routes import api
from config import engine, Base

app = Flask(__name__)
CORS(app)

app.register_blueprint(api, url_prefix='/api')

Base.metadata.create_all(bind=engine)

@app.errorhandler(Exception)
def handle_exception(e):
    return jsonify({'error': 'Unexpected Error', 'message': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
