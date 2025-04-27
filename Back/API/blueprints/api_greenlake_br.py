import logging
from flask import Flask, request, jsonify, render_template
from flask import Blueprint, request, jsonify
from datetime import datetime
from .dao import cur
import requests

api_bp = Blueprint('api', __name__, url_prefix='/api/greenlake-eval')

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@api_bp.route('/test', methods=['GET'])
def test1():
    cur.execute("SELECT now();")
    timestamp = cur.fetchone()
    status = "active"
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
    # 1) Parámetros requeridos
    city_id   = request.args.get('city_id')
    start_str = request.args.get('start_date')
    end_str   = request.args.get('end_date')
    if not city_id or not start_str or not end_str:
        return jsonify({
            "metadata": {
                "status": "error",
                "message": "Se requieren los parámetros city_id, start_date y end_date"
            }
        }), 400

    # 2) Parseo de fechas (ISO 8601 o YYYY-MM-DD)
    try:
        def parse_date(s: str) -> datetime:
            try:
                # acepta "YYYY-MM-DD" y "YYYY-MM-DDTHH:MM:SS"
                return datetime.fromisoformat(s)
            except ValueError:
                # acepta día/mes de uno o dos dígitos: "YYYY-M-D"
                return datetime.strptime(s, "%Y-%m-%d")

        try:
            start_dt = parse_date(start_str)
            end_dt   = parse_date(end_str)
        except ValueError:
            return jsonify({
                "metadata": {
                    "status": "error",
                    "message": (
                        "Formato de fecha inválido. "
                        "Use ISO 8601 (por ej. 2025-01-08, 2025-1-8 o 2025-01-08T16:37:21)"
                    )
                }
            }), 400
    except ValueError:
        return jsonify({
            "metadata": {
                "status": "error",
                "message": "Formato de fecha inválido. Use ISO 8601 (por ej. 2025-01-08 o 2025-01-08T16:37:21)"
            }
        }), 400

    # 3) Consulta a la base de datos
    sql = """
        SELECT event_id, city_id, name, description, start_date, end_date, venue_id
        FROM events
        WHERE city_id = %s
          AND start_date >= %s
          AND end_date   <= %s
        ORDER BY start_date;
    """
    cur.execute(sql, (city_id, start_dt, end_dt))
    rows = cur.fetchall()

    # 4) Construcción del JSON de resultados
    results = []
    for event_id, city_id_, name, description, start_dt, end_dt, venue_id in rows:
        # formateo RFC-1123
        fmt = "%a, %d %b %Y %H:%M:%S GMT"
        results.append({
            "event_id":    str(event_id),
            "city_id":     str(city_id_),
            "name":        name,
            "description": description,
            "start_date":  start_dt.strftime(fmt),
            "end_date":    end_dt.strftime(fmt),
            "venue_id":    str(venue_id)
        })

    # 5) Timestamp de la respuesta
    resp_ts = datetime.now().strftime("%Y-%m-%dT%H:%M:%SZ")

    return jsonify({
        "metadata": {
            "status":    "success",
            "timestamp": resp_ts
        },
        "results": results
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

    try:
        llm_response = requests.post(
            'http://10.10.76.241:5454/generate',
            json={'question': question},
            timeout=30  # Timeout after 30 seconds
        )
        
        # Check if request was successful
        if llm_response.status_code == 200:
            message = llm_response.json().get('message', 'No message provided')
            image = llm_response.json().get('image', None)
            logger.info(f"LLM response: {llm_response.json()}")
        else:
            return jsonify({
                "metadata": {
                    "status": "error",
                    "timestamp": datetime.now().isoformat() + "Z"
                },
                "error": f"LLM service returned status code {llm_response.status_code}"
            }), 500
    except requests.exceptions.RequestException as e:
        return jsonify({
            "metadata": {
                "status": "error",
                "timestamp": datetime.now().isoformat() + "Z"
            },
            "error": f"Failed to connect to LLM service: {str(e)}"
        }), 500

    return jsonify({
        
        "metadata": {
            "status": "success",
            "timestamp": datetime.now().isoformat() + "Z"
        },
        "results": {
            "message": message,
            "image": image
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
    