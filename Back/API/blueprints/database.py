from flask import Flask, request, jsonify, render_template
from flask import Blueprint, request, jsonify
from datetime import datetime
from .dao import cur
from psycopg2 import sql, DatabaseError
import re

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

@database_bp.route('/export', methods=['POST'])
def export_tables():
    # 1) Obtener y validar payload
    payload = request.get_json(force=True, silent=True)
    if not payload or 'tables' not in payload:
        return jsonify({
            "status": "error",
            "message": "Debe enviar un JSON con la clave 'tables'."
        }), 400

    tables = payload['tables']
    if not isinstance(tables, list) or not all(isinstance(t, str) for t in tables):
        return jsonify({
            "status": "error",
            "message": "La clave 'tables' debe ser una lista de strings."
        }), 400

    # 2) Asegurar nombres válidos
    valid_name = re.compile(r'^[A-Za-z_][A-Za-z0-9_]*$')
    for tbl in tables:
        if not valid_name.match(tbl):
            return jsonify({
                "status": "error",
                "message": f"Nombre de tabla inválido: '{tbl}'."
            }), 400

    exported = []
    # 3) Exportar cada tabla
    for tbl in tables:
        try:
            # Construir consulta segura
            query = sql.SQL("SELECT * FROM {}").format(sql.Identifier(tbl))
            cur.execute(query)

            # Columnas y filas
            cols = [col.name for col in cur.description]
            rows = cur.fetchall()

            # Formatear como lista de dicts
            data = [dict(zip(cols, row)) for row in rows]

            exported.append({
                "table": tbl,
                "rows": data
            })

        except DatabaseError as e:
            # Capturar error por tabla y devolver al cliente
            msg = str(e).split('\n')[0]
            return jsonify({
                "status": "error",
                "message": f"Error al exportar tabla '{tbl}': {msg}"
            }), 400

    # 4) Responder con todas las tablas exportadas
    return jsonify({
        "status": "success",
        "tables": exported
    }), 200