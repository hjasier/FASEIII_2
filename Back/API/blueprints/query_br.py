from flask import Flask, request, jsonify, render_template
from flask import Blueprint, request, jsonify
from datetime import datetime
from .dao import cur
import re
from flask import request, jsonify
from psycopg2 import sql, DatabaseError

q_br = Blueprint('query', __name__)

@q_br.route('/expert_query', methods=['POST'])
def expert_query():
    # 1) Obtener y validar JSON
    payload = request.get_json(force=True, silent=True)
    if not payload or 'query' not in payload:
        return jsonify({
            "status": "error",
            "message": "Debe enviar un JSON con la clave 'query'."
        }), 400

    raw_query = payload['query'].strip()

    # 2) Sólo permitimos SELECT para evitar operaciones mutantes
    if not re.match(r'(?i)^\s*SELECT\b', raw_query):
        return jsonify({
            "status": "error",
            "message": "Por seguridad sólo se permiten sentencias SELECT."
        }), 400

    try:
        # 3) Ejecutar en la base de datos
        #    Si en el futuro necesitas interpolar nombres de tabla/columna,
        #    pásalos por psycopg2.sql.Identifier.
        cur.execute(sql.SQL(raw_query))

        # 4) Leer columnas y filas
        columns = [col.name for col in cur.description]
        rows = cur.fetchall()

        # 5) Construir lista de dicts
        results = [
            dict(zip(columns, row))
            for row in rows
        ]

        return jsonify({
            "status":  "success",
            "results": results
        }), 200

    except DatabaseError as e:
        # 6) Capturar errores de SQL y devolver mensaje amigable
        return jsonify({
            "status":  "error",
            "message": str(e).split('\n')[0]  # sólo la primera línea
        }), 400