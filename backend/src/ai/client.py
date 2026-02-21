
from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()

class AIClient:
    def __init__(self):
        self.api_key = os.getenv("OPENAI_API_KEY")
        # בודק אם יש מפתח כדי לדעת אם להפעיל AI אמיתי או Mock
        self.enabled = bool(self.api_key)
        
        if self.enabled:
            self.client = OpenAI(api_key=self.api_key)
        else:
            self.client = None
            print("[AI_CLIENT] Notice: No API Key found. Running in MOCK mode.")

    async def generate_lesson(self, *args, **kwargs):
        # חילוץ הנתונים מהארגומנטים (תואם לשתי הגרסאות)
        topic = kwargs.get('topic') or (args[0] if len(args) > 0 else "General")
        sub_topic = kwargs.get('sub_topic') or (args[1] if len(args) > 1 else "General")
        prompt_text = kwargs.get('prompt_text') or kwargs.get('prompt') or "Explain"

        # --- מנגנון הגיבוי (MOCK) ---
        if not self.enabled or not self.client:
            return (
                f"### [MOCK LESSON - AI Offline]\n\n"
                f"**נושא:** {topic} / {sub_topic}\n"
                f"**בקשה:** {prompt_text}\n\n"
                f"זוהי תשובת דמה (Mock). המערכת מוכנה לחיבור ל-AI!\n"
                f"כדי לראות תשובה אמיתית, יש להזין מפתח API בקובץ ה-env."
            )

        # --- חיבור ל-AI אמיתי ---
        try:
            response = self.client.chat.completions.create(
                model="gpt-4o", 
                messages=[
                    {"role": "system", "content": "אתה עוזר הוראה מקצועי. ענה בעברית ברורה ומאורגנת."},
                    {"role": "user", "content": f"נושא: {topic} -> {sub_topic}. משימה: {prompt_text}"}
                ],
                timeout=15  # הגנה מפני המתנה ארוכה מדי
            )
            return response.choices[0].message.content

        except Exception as e:
            print(f"OPENAI ERROR: {e}")
            return f"מצטערים, חלה שגיאה בחיבור ל-OpenAI. הנה הנתונים שנשלחו: {topic} - {sub_topic}"

ai_client = AIClient()