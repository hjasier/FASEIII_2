from flask import Flask, request, jsonify, render_template
from flask import Blueprint, request, jsonify
from datetime import datetime
from .dao import cur, conn
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
       
@q_br.route('/admin_query', methods=['POST'])
def admin_query():
    # 1) Obtener y validar payload
    payload = request.get_json(force=True, silent=True)
    query = payload.get('query') if payload else None
    if not query or not isinstance(query, str):
        return jsonify({
            "status": "error",
            "message": "Debe enviar un JSON con la clave 'query' (string)."
        }), 400

    try:
        # 2) Ejecutar la query
        cur.execute(sql.SQL(query))

        # 3) Si devuelve filas, las fetchamos
        results = None
        if cur.description:
            columns = [col.name for col in cur.description]
            rows = cur.fetchall()
            results = [dict(zip(columns, row)) for row in rows]
        else:
            # No hay resultado (INSERT/UPDATE/DELETE/DDL): confirmamos cambios
            conn.commit()

        # 4) Construir respuesta
        resp = {"status": "success"}
        if results is not None:
            resp["results"] = results
        else:
            resp["message"] = "Query ejecutada correctamente."
        return jsonify(resp), 200

    except DatabaseError as e:
        # 5) En caso de error, revertir y devolver mensaje
        conn.rollback()
        return jsonify({
            "status": "error",
            "message": str(e).split("\n")[0]
        }), 400