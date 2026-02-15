"""
חיבור ל-PostgreSQL. קורא מ-.env (או מהסביבה).
כדי לא להתנגש עם PostgreSQL מקומי – הדוקר רץ על פורט 5433.
"""
import os
from pathlib import Path

from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base

# טעינת .env מתיקיית backend (ליד main.py)
_env_path = Path(__file__).resolve().parents[2] / ".env"
load_dotenv(_env_path)

user = os.getenv("POSTGRES_USER", "user")
password = os.getenv("POSTGRES_PASSWORD", "password")
host = os.getenv("POSTGRES_HOST", "127.0.0.1")
port = os.getenv("POSTGRES_PORT", "5433")
db = os.getenv("POSTGRES_DB", "ai_learning_db")

DATABASE_URL = f"postgresql://{user}:{password}@{host}:{port}/{db}"
engine = create_engine(DATABASE_URL)
Base = declarative_base()