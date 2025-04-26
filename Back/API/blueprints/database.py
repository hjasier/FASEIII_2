from flask import Flask, request, jsonify, render_template
from flask import Blueprint, request, jsonify, send_file
from datetime import datetime
from .dao import cur
from psycopg2 import sql, DatabaseError
import re
import re
import io
import csv
import zipfile
from flask import request, jsonify, send_file
from psycopg2 import sql, DatabaseError

database_bp = Blueprint('database', __name__)

@database_bp.route('/tables', methods=['GET'])
def list_tables():
    """
    GET /api/greenlake-eval/tables
    Devuelve todas las tablas (BASE TABLES) del esquema público y otros esquemas de usuario,
    incluyendo su descripción si existe.
    """
    try:
        cur.execute("""
            SELECT
                nspname AS schema,
                relname AS table,
                obj_description(pg_class.oid) AS description
            FROM pg_class
            JOIN pg_namespace ON pg_namespace.oid = pg_class.relnamespace
            WHERE relkind = 'r' -- Only ordinary tables
              AND nspname = 'public' -- Replace 'public' if needed
            ORDER BY nspname, relname;
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
        {"schema": schema, "table": table, "description": description}
        for schema, table, description in rows
    ]

    return jsonify({
        "metadata": {
            "status": "success",
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
    # 1) Validar payload
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

    # 2) Validar nombres de tabla (evitar inyección)
    valid_name = re.compile(r'^[A-Za-z_][A-Za-z0-9_]*$')
    for tbl in tables:
        if not valid_name.match(tbl):
            return jsonify({
                "status": "error",
                "message": f"Nombre de tabla inválido: '{tbl}'."
            }), 400

    # 3) Recolectar datos de cada tabla
    table_csvs = {}
    try:
        for tbl in tables:
            # Construir consulta segura
            query = sql.SQL("SELECT * FROM {}").format(sql.Identifier(tbl))
            cur.execute(query)

            cols = [col.name for col in cur.description]
            rows = cur.fetchall()

            # Generar CSV en memoria
            sio = io.StringIO()
            writer = csv.writer(sio)
            writer.writerow(cols)
            writer.writerows(rows)
            table_csvs[tbl] = sio.getvalue()
    except DatabaseError as e:
        msg = str(e).split('\n')[0]
        return jsonify({
            "status": "error",
            "message": f"Error al exportar tabla '{tbl}': {msg}"
        }), 400

    # 4) Si solo hay una tabla, enviar CSV directamente
    if len(table_csvs) == 1:
        tbl, content = next(iter(table_csvs.items()))
        mem = io.BytesIO(content.encode('utf-8'))
        mem.seek(0)
        return send_file(
            mem,
            as_attachment=True,
            download_name=f"{tbl}.csv",
            mimetype="text/csv"
        )

    # 5) Si hay varias, empaquetar en ZIP
    mem_zip = io.BytesIO()
    with zipfile.ZipFile(mem_zip, 'w', zipfile.ZIP_DEFLATED) as zf:
        for tbl, content in table_csvs.items():
            zf.writestr(f"{tbl}.csv", content)
    mem_zip.seek(0)

    return send_file(
        mem_zip,
        as_attachment=True,
        download_name="export_tables.zip",
        mimetype="application/zip"
    )