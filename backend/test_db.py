import psycopg2
import os

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://user:password@localhost:5433/ai_learning_db")

try:
    conn = psycopg2.connect(DATABASE_URL, connect_timeout=5)
    cur = conn.cursor()
    cur.execute("SELECT version();")
    version = cur.fetchone()
    print("Postgres version:", version[0])
    cur.close()
    conn.close()
except Exception as e:
    print("DB connection error:", e)