from sqlalchemy.orm import Session

from src.ai.client import ai_client
from src.models import Category, SubCategory, User, Prompt
from src.schemas import PromptCreate


class PromptService:
    @staticmethod
    def create_prompt(db: Session, data: PromptCreate) -> Prompt:
        user = db.get(User, data.user_id)
        category = db.get(Category, data.category_id)
        sub_category = db.get(SubCategory, data.sub_category_id)

        if not user or not category or not sub_category:
            raise ValueError("Invalid user/category/sub_category id")

        # AI call – lesson generation
        # Since generate_lesson is async but we're in a sync context,
        # we create a new event loop to run it
        import asyncio

        # Create a new event loop for this thread
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        try:
            response_text = loop.run_until_complete(
                ai_client.generate_lesson(
                    topic=category.name,
                    sub_topic=sub_category.name,
                    prompt=data.prompt,
                    user_name=user.name,
                )
            )
        finally:
            loop.close()

        prompt = Prompt(
            user_id=user.id,
            category_id=category.id,
            sub_category_id=sub_category.id,
            prompt=data.prompt,
            response=response_text,
        )
        db.add(prompt)
        db.commit()
        db.refresh(prompt)
        return prompt

    @staticmethod
    def list_user_prompts(db: Session, user_id: int) -> list[Prompt]:
        return (
            db.query(Prompt)
            .filter(Prompt.user_id == user_id)
            .order_by(Prompt.created_at.desc())
            .all()
        )

    @staticmethod
    def list_all_prompts(db: Session) -> list[Prompt]:
        return db.query(Prompt).order_by(Prompt.created_at.desc()).all()

