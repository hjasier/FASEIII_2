# app.py
from flask import Flask, request, jsonify, render_template
from flask import Blueprint, request, jsonify
from datetime import datetime
from blueprints.dao import cur
import psycopg2
from blueprints.kafka import kafka_bp
from blueprints.api_greenlake_br import api_bp
from blueprints.database import database_bp
from blueprints.query_br import q_br
from blueprints.llm_callback import llm_bp
from blueprints.auth import auth_bp  # Import the auth blueprint
from blueprints.projects import projects_bp  # Import the projects blueprint
from flask_cors import CORS
from flask_jwt_extended import JWTManager

app = Flask(__name__)  # crea la aplicación
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

# JWT Configuration
app.config["JWT_SECRET_KEY"] = "your-secret-key"  # Change this to a secure secret key
app.config["JWT_TOKEN_LOCATION"] = ["headers"]
app.config["JWT_HEADER_NAME"] = "Authorization"
app.config["JWT_HEADER_TYPE"] = "Bearer"

# Initialize JWT
jwt = JWTManager(app)

@app.route('/')
def index():
    return render_template('index.html')  # devuelve una plantilla
    
app.register_blueprint(api_bp)
app.register_blueprint(kafka_bp)
app.register_blueprint(database_bp)
app.register_blueprint(q_br)
app.register_blueprint(llm_bp)
app.register_blueprint(auth_bp, url_prefix='/auth')  # Register the auth blueprint
app.register_blueprint(projects_bp, url_prefix='/projects')  # Register the projects blueprint

if __name__ == '__main__':
    # Use standard Flask run method instead of socketio.run
    app.run(debug=True, host='0.0.0.0', port=5454)