from flask import Flask, request, jsonify, render_template
from flask import Blueprint, request, jsonify
from datetime import datetime
from .dao import cur

database_bp = Blueprint('database', __name__)

@database_bp.route('/tables', methods=['GET'])
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

@database_bp.route('/columns/<table_name>', methods=['GET'])
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

