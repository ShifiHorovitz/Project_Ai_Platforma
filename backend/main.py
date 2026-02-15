import sys
import os
from fastapi import FastAPI

# התיקון הקריטי: מוסיף את תיקיית src לנתיב החיפוש של פייתון
current_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.append(os.path.join(current_dir, "src"))

# עכשיו הייבוא יעבוד "חלק"
from config.database import engine, Base
# חשוב לייבא את המודלים לפני יצירת הטבלאות
from models.user import User

# יצירת הטבלאות בתוך ה-Database (דוקר)
Base.metadata.create_all(bind=engine)

app = FastAPI(title="AI Learning Platform API")

@app.get("/")
def read_root():
    return {"status": "success", "message": "The AI Platform is alive and connected!"}