# import os
# import sys

# from fastapi import FastAPI

# # Ensure `src` is on the Python path so imports like `src.models` work
# current_dir = os.path.dirname(os.path.abspath(__file__))
# sys.path.append(os.path.join(current_dir, "src"))

# from config.database import Base, engine  # noqa: E402
# from src import models  # noqa: E402,F401
# from src.routers import (  # noqa: E402
#     categories_router,
#     health_router,
#     prompts_router,
#     users_router,
# )

# # Create DB schema on startup (for this small assignment we can keep it simple)
# Base.metadata.create_all(bind=engine)

# app = FastAPI(title="AI Learning Platform API")

# app.include_router(health_router)
# app.include_router(users_router)
# app.include_router(categories_router)
# app.include_router(prompts_router)


# @app.get("/")
# def read_root():
#     return {"status": "success", "message": "The AI Platform is alive and connected!"}



import os
import sys

from fastapi import FastAPI
# 1. הוספנו את ה-import הזה
from fastapi.middleware.cors import CORSMiddleware

# Ensure `src` is on the Python path so imports like `src.models` work
current_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.append(os.path.join(current_dir, "src"))

from config.database import Base, engine  # noqa: E402
from src import models  # noqa: E402,F401
from src.routers import (  # noqa: E402
    admin_router,
    auth_router,
    categories_router,
    health_router,
    prompts_router,
    users_router,
)

# Create DB schema on startup
Base.metadata.create_all(bind=engine)

app = FastAPI(title="AI Learning Platform API")

# 2. הוספת ה-Middleware - זה התיקון לשגיאת ה-CORS שראינו
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router)
app.include_router(auth_router)
app.include_router(users_router)
app.include_router(categories_router)
app.include_router(prompts_router)
app.include_router(admin_router)


@app.get("/")
def read_root():
    return {"status": "success", "message": "The AI Platform is alive and connected!"}