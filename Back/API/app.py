# app.py
from flask import Flask, request, jsonify, render_template
from flask import Blueprint, request, jsonify
from datetime import datetime
from blueprints.dao import cur
import psycopg2
from socketio_instance import socketio
from blueprints.kafka import kafka_bp, init_kafka_consumer
from blueprints.api_greenlake_br import api_bp
from flask_cors import CORS

app = Flask(__name__)  # crea la aplicación
CORS(app)  # habilita CORS para la aplicación

@app.route('/')
def index():
    return render_template('index.html')  # devuelve una plantilla
    
app.register_blueprint(api_bp)

app.register_blueprint(kafka_bp)
init_kafka_consumer()  
socketio.init_app(app)


    
if __name__ == '__main__':
    socketio.run(app,debug=True, host='0.0.0.0', port=5454)
