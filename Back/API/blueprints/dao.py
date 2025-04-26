import psycopg2

conn = psycopg2.connect(
    dbname="greenlake_data",
    user="admin",
    password="overF!tHT25",
    host="10.10.76.241",
    port="6565"
)
cur = conn.cursor() #Este esta importado ya como variable global
#cur.execute("SELECT now();")
#print(cur.fetchone())
#conn.close()
