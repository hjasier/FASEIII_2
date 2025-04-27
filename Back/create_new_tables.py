import requests
import sys

def insert_coches(api_url: str, sql_path: str):
    # 1) Leer todo el fichero
    try:
        with open(sql_path, "r", encoding="utf-8") as f:
            sql_script = f.read()
    except IOError as e:
        print(f"Error al leer '{sql_path}': {e}")
        sys.exit(1)

    # 2) Partir en sentencias SQL individuales (basado en ';')
    #    Eliminamos líneas vacías y comentarios que terminen en ';'
    raw_statements = sql_script.split(';')
    statements = []
    for stmt in raw_statements:
        stmt = stmt.strip()
        if not stmt:
            continue
        # volver a añadir el punto y coma
        statements.append(stmt + ';')

    # 3) Enviar cada sentencia por separado
    for idx, stmt in enumerate(statements, start=1):
        print(f"\nEjecutando sentencia {idx}/{len(statements)}:")
        print(stmt)
        payload = {"query": stmt}
        try:
            resp = requests.post(f"{api_url}/admin_query", json=payload)
        except requests.RequestException as e:
            print(f"  ❌ Error de conexión: {e}")
            continue

        if resp.status_code != 200:
            print(f"  ❌ HTTP {resp.status_code}: {resp.text}")
            continue

        data = resp.json()
        if data.get("status") == "success":
            # Dependiendo de si devuelve filas o no, ajusta el mensaje
            if data.get("results") is not None:
                print(f"  ✔️ OK, devolvió {len(data['results'])} filas.")
            else:
                print("  ✔️ OK, sentencia ejecutada correctamente.")
        else:
            print(f"  ❌ Error en la query: {data.get('message')}")

if __name__ == "__main__":
    API_URL  = "http://localhost:5454"  # tu servidor Flask

    #insert_coches(API_URL, "coches.sql")
    #insert_coches(API_URL, "people.sql")
    #insert_coches(API_URL, "taxistas.sql")ç
    insert_coches(API_URL, "trips.sql")