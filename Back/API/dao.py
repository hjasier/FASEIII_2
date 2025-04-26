import psycopg2

conn = psycopg2.connect(
    dbname="postgres",
    user="admin",
    password="overF!tHT25",
    host="10.10.76.241",
    port="6565"
)
cur = conn.cursor()
cur.execute("SELECT now();")
print(cur.fetchone())
conn.close()
