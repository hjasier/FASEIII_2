from flask import Flask, request, jsonify, render_template
from flask import Blueprint, request, jsonify
from datetime import datetime
from .dao import cur

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
    
@api_bp.route('/sensors/<operation>', methods=['GET'])
def sensors_data(operation):
    # Operaciones permitidas
    allowed_ops = ['average', 'min', 'max']
    if operation not in allowed_ops:
        return jsonify({
            "metadata": {
                "status": "error",
                "timestamp": datetime.now().isoformat() + "Z"
            },
            "error": f"Operación inválida: {operation}. Valores permitidos: {', '.join(allowed_ops)}"
        }), 400

    # Parámetros requeridos
    city_id     = request.args.get('city_id')
    sensor_type = request.args.get('sensor_type')
    date_str    = request.args.get('date')

    if not all([city_id, sensor_type, date_str]):
        return jsonify({
            "metadata": {
                "status": "error",
                "timestamp": datetime.now().isoformat() + "Z"
            },
            "error": "Faltan parámetros requeridos: city_id, sensor_type, date"
        }), 400

    # De momento devolvemos un JSON de ejemplo
    return jsonify({
        "metadata": {
            "status": "success",
            "timestamp": datetime.now().isoformat() + "Z"
        },
        "results": [
            {
                "metric": "pm10",
                "unit": "µg/m³",
                "value": 70.64
            },
            {
                "metric": "co",
                "unit": "ppm",
                "value": 6.11
            },
            {
                "metric": "co2",
                "unit": "ppm",
                "value": 509.84
            }
        ]
    })
    
@api_bp.route('/ask', methods=['POST'])
def ask_chatbot():
    data = request.get_json(force=True)

    # Validar que llegue la pregunta
    question = data.get('question')
    if not question:
        return jsonify({
            "metadata": {
                "status": "error",
                "timestamp": datetime.now().isoformat() + "Z"
            },
            "error": "Falta el campo 'question' en el cuerpo de la petición"
        }), 400

    # Por ahora devolvemos la respuesta de ejemplo sin lógica real
    example_answer = (
        "La canción más escuchada de GreenLake City es "
        "'Sam Smith;Kim Petras Unholy (feat. Kim Petras)'"
    )

    return jsonify({
        "metadata": {
            "status": "success",
            "timestamp": datetime.now().isoformat() + "Z"
        },
        "results": {
            "answer": example_answer
        }
    })