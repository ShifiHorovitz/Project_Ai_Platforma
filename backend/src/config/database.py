"""
Database configuration for the AI Learning Platform.

- Loads connection details from `.env` (or environment variables).
- Exposes `engine`, `SessionLocal`, and `Base`.
- Provides `get_db` dependency for FastAPI routes.
"""

import os
from pathlib import Path
from typing import Generator

from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Load .env from backend root (next to main.py)
_env_path = Path(__file__).resolve().parents[2] / ".env"
load_dotenv(_env_path)

user = os.getenv("POSTGRES_USER", "user")
password = os.getenv("POSTGRES_PASSWORD", "password")
host = os.getenv("POSTGRES_HOST", "127.0.0.1")
port = os.getenv("POSTGRES_PORT", "5433")
db = os.getenv("POSTGRES_DB", "ai_learning_db")

DATABASE_URL = f"postgresql://{user}:{password}@{host}:{port}/{db}"

engine = create_engine(DATABASE_URL, future=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def get_db() -> Generator:
    """
    FastAPI dependency that provides a database session and
    makes sure it's closed after the request.
    """
    db_session = SessionLocal()
    try:
        yield db_session
    finally:
        db_session.close()