import os
import sys

from fastapi import FastAPI

# Ensure `src` is on the Python path so imports like `src.models` work
current_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.append(os.path.join(current_dir, "src"))

from config.database import Base, engine  # noqa: E402
from src import models  # noqa: E402,F401
from src.routers import (  # noqa: E402
    categories_router,
    health_router,
    prompts_router,
    users_router,
)

# Create DB schema on startup (for this small assignment we can keep it simple)
Base.metadata.create_all(bind=engine)

app = FastAPI(title="AI Learning Platform API")

app.include_router(health_router)
app.include_router(users_router)
app.include_router(categories_router)
app.include_router(prompts_router)


@app.get("/")
def read_root():
    return {"status": "success", "message": "The AI Platform is alive and connected!"}