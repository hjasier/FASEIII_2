# app.py
from flask import Flask, request, jsonify, render_template
from flask import Blueprint, request, jsonify
from datetime import datetime
from dao import cur
import psycopg2
from socketio_instance import socketio
from blueprints.kafka import kafka_bp, init_kafka_consumer

app = Flask(__name__)  # crea la aplicación

@app.route('/')
def index():
    return render_template('index.html')  # devuelve una plantilla

api_bp = Blueprint('api', __name__, url_prefix='/api/greenlake-eval')

@api_bp.route('/test', methods=['GET'])
def test1():
    timestamp = datetime.now().isoformat() + "Z"
    status = "running"
    return jsonify({
        "metadata": {
            "status": "success",
            "timestamp": timestamp
        },
        "results": {
            "status": status
        }
    })

@api_bp.route('/hospitals/nearby', methods=['GET'])
def test2():
    lat = request.args.get('lat', '79.8965515')
    lon = request.args.get('lon', '-48.0003246')
    radius = request.args.get('radius', '1000')
    return jsonify({
        "metadata": {
            "status": "success",
            "timestamp": "YYYY-MM-DDTHH:MM:SSZ"
        },
        "results": [
            {
                "id": "86cbe6d4-f169-4867-8672-8ec4609b6293",
                "city_id": "371197f0-1599-4e3a-a0a7-c90da11bc5b6",
                "name": "Hielo Alto Medical Center",
                "longitude": float(lon),
                "latitude": float(lat),
                "distance_m": 0.0
            }
        ]
    })

@api_bp.route('/events/nearby', methods=['GET'])
def events_nearby():
    # Parámetros requeridos
    city_id   = request.args.get('city_id')
    start_str = request.args.get('start_date')
    end_str   = request.args.get('end_date')
    
    return jsonify({
        "metadata": {
            "status": "success",
            "timestamp": "YYYY-MM-DDTHH:MM:SSZ"
        },
        "results": [
            {
                "city_id": "3aedcf9c-e38d-4377-bade-6e27dd7c9b22",
                "description": "Join us for an unforgettable night of Punk music with Crystal Farrell",
                "end_date": "Sat, 11 Jan 2025 16:37:21 GMT",
                "event_id": "2d9c9a38-8cb9-4226-813c-9be3ce1c66d3",
                "name": "Kylie Black Concert",
                "start_date": "Wed, 08 Jan 2025 16:37:21 GMT",
                "venue_id": "d9075054-085b-4c89-ad7b-19e95b5b5cd1"
            }
        ]
        })
    
app.register_blueprint(api_bp)

app.register_blueprint(kafka_bp)
socketio.init_app(app)

init_kafka_consumer()  
    
if __name__ == '__main__':
    socketio.run(app,debug=True, host='0.0.0.0', port=5454)
