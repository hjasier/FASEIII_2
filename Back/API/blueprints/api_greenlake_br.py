from flask import Flask, request, jsonify, render_template
from flask import Blueprint, request, jsonify
from datetime import datetime
from .dao import cur

api_bp = Blueprint('api', __name__, url_prefix='/api/greenlake-eval')

@api_bp.route('/test', methods=['GET'])
def test1():
    cur.execute("SELECT now();")
    timestamp = cur.fetchone()
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
def hospitals_nearby():
    # 1) Leer y validar parámetros
    try:
        lat    = float(request.args.get('lat'))
        lon    = float(request.args.get('lon'))
        radius = float(request.args.get('radius', 1000))
    except (TypeError, ValueError):
        return jsonify({
            "metadata": {
                "status": "error",
                "timestamp": datetime.now().isoformat() + "Z"
            },
            "error": "Parámetros inválidos. Asegúrate de enviar lat, lon y radius numéricos."
        }), 400

    # 2) Query PostGIS: ST_DWithin + ST_Distance
    sql = """
        SELECT
                i.id,
                i.city_id,
                i.name,
                ST_X(i.location)             AS longitude,
                ST_Y(i.location)             AS latitude,
                ST_Distance(
                    i.location::geography,
                    ST_SetSRID(ST_MakePoint(%s, %s), 4326)::geography
                )                             AS distance_m
            FROM infrastructure AS i
            JOIN infrastructure_hospital AS h
            ON h.infra_id = i.id
            WHERE i.type = 'hospital'
            AND ST_DWithin(
                    i.location::geography,
                    ST_SetSRID(ST_MakePoint(%s, %s), 4326)::geography,
                    %s
            )
            ORDER BY distance_m;
        """

    try:
        # lon, lat en el orden correcto para MakePoint, repetidos para DWithin
        cur.execute(sql, (lon, lat, lon, lat, radius))
        rows = cur.fetchall()
    except Exception as e:
        return jsonify({
            "metadata": {
                "status": "error",
                "timestamp": datetime.now().isoformat() + "Z"
            },
            "error": f"Error al consultar la base de datos: {e}"
        }), 500

    # 3) Formatear resultados
    results = []
    for _id, city_id, name, lng, lat_, dist in rows:
        results.append({
            "id":         str(_id),
            "city_id":    str(city_id),
            "name":       name,
            "longitude":  lng,
            "latitude":   lat_,
            "distance_m": round(dist, 2)
        })

    # 4) Responder JSON
    return jsonify({
        "metadata": {
            "status":    "success",
            "timestamp": datetime.now().isoformat() + "Z"
        },
        "results": results
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
    
@api_bp.route('/tables', methods=['GET'])
def list_tables():
    """
    GET /api/greenlake-eval/tables
    Devuelve todas las tablas (BASE TABLES) del esquema público y otros esquemas de usuario.
    """
    try:
        # Excluimos los esquemas del sistema
        cur.execute("""
            SELECT table_schema, table_name
              FROM information_schema.tables
             WHERE table_type = 'BASE TABLE' AND table_schema = 'public'
             ORDER BY table_schema, table_name;
        """)
        rows = cur.fetchall()
    except Exception as e:
        return jsonify({
            "metadata": {
                "status": "error",
                "timestamp": datetime.now().isoformat() + "Z"
            },
            "error": f"Error al consultar la base de datos: {e}"
        }), 500

    # Formateamos cada fila en un dict
    tables = [
        {"schema": schema, "table": table}
        for schema, table in rows
    ]

    return jsonify({
        "metadata": {
            "status":    "success",
            "timestamp": datetime.now().isoformat() + "Z"
        },
        "results": tables
    })

@api_bp.route('/columns/<table_name>', methods=['GET'])
def get_columns(table_name):
    """
    GET /api/greenlake-eval/columns/<table_name>
    Devuelve todas las columnas y sus tipos de datos de una tabla específica en el esquema público.
    """
    try:
        cur.execute("""
            SELECT column_name, data_type
              FROM information_schema.columns
             WHERE table_schema = 'public' AND table_name = %s
             ORDER BY ordinal_position;
        """, (table_name,))
        rows = cur.fetchall()

    except Exception as e:
        return jsonify({
            "metadata": {
                "status": "error",
                "timestamp": datetime.now().isoformat() + "Z"
            },
            "error": f"Error al consultar la base de datos: {e}"
        }), 500

    if not rows:
        return jsonify({
            "metadata": {
                "status": "error",
                "timestamp": datetime.now().isoformat() + "Z"
            },
            "error": f"La tabla '{table_name}' no existe o no tiene columnas."
        }), 404

    # Formateamos en una lista de diccionarios {name, type}
    columns = [{"column_name": name, "data_type": dtype} for name, dtype in rows]

    return jsonify({
        "metadata": {
            "status": "success",
            "timestamp": datetime.now().isoformat() + "Z"
        },
        "results": columns
    })

