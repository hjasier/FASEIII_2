import psycopg2

# Database connection parameters
host = "10.10.76.241"
port = 6565
database = "greenlake_data"  # Replace with your database name
user = "admin"
password = "overF!tHT25"  # Replace with your password

try:
    # Establish the connection
    connection = psycopg2.connect(
        host=host,
        port=port,
        database=database,
        user=user,
        password=password
    )
    print("Connection to the database established successfully.")

    cursor = connection.cursor()

except psycopg2.Error as e:
        print(f"An error occurred: {e}")

    

def query(query):
    # Execute the query
    cursor.execute(query)

    # Fetch all rows from the executed query
    rows = cursor.fetchall()

    return rows

    

def generate_schema_summary(columns, foreign_keys):
    summary = {}
    
    # 1. Describe each table
    for table, column, dtype in columns:
        if table not in summary:
            summary[table] = {"columns": [], "relations": []}
        summary[table]["columns"].append(f"- {column} ({dtype})")
    
    # 2. Describe relationships
    for table, column, foreign_table, foreign_column in foreign_keys:
        summary[table]["relations"].append(f"- {column} references {foreign_table}.{foreign_column}")

    # 3. Format into a nice string
    schema_description = ""
    for table, info in summary.items():
        schema_description += f"Table `{table}`:\n"
        schema_description += "\n".join(info["columns"]) + "\n"
        if info["relations"]:
            schema_description += "Relations:\n" + "\n".join(info["relations"]) + "\n"
        schema_description += "\n"
    
    return schema_description

if __name__ == "__main__":
    columns_query = """SELECT table_name, column_name, data_type
FROM information_schema.columns
WHERE table_schema = 'public'
ORDER BY table_name, ordinal_position;"""

    foreign_keys_query = """SELECT 
    tc.table_name, 
    kcu.column_name, 
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name 
FROM 
    information_schema.table_constraints AS tc 
    JOIN information_schema.key_column_usage AS kcu 
      ON tc.constraint_name = kcu.constraint_name
    JOIN information_schema.constraint_column_usage AS ccu 
      ON ccu.constraint_name = tc.constraint_name
WHERE tc.constraint_type = 'FOREIGN KEY'
  AND tc.table_schema = 'public'
  AND tc.table_name NOT LIKE '_hyper_%'
  AND ccu.table_name NOT LIKE '_hyper_%'
  AND tc.table_name IN (
      SELECT tablename
      FROM pg_tables
      WHERE schemaname = 'public'
        AND tableowner = 'admin'
  )
  AND ccu.table_name IN (
      SELECT tablename
      FROM pg_tables
      WHERE schemaname = 'public'
        AND tableowner = 'admin'
  )
ORDER BY tc.table_name;
"""

    schema_summary = generate_schema_summary(query(columns_query), query(foreign_keys_query))
    print("Schema Summary:")
    print(schema_summary)

    if 'cursor' in locals():
        cursor.close()
    if 'connection' in locals():
        connection.close()
        print("Database connection closed.")