from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from config.database import get_db
from src.schemas import PromptCreate, PromptRead
from src.services.prompt_service import PromptService

router = APIRouter(prefix="/prompts", tags=["prompts"])


@router.post("/", response_model=PromptRead, status_code=status.HTTP_201_CREATED)
def create_prompt(payload: PromptCreate, db: Session = Depends(get_db)):
    try:
        prompt = PromptService.create_prompt(db, payload)
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc))
    return prompt


@router.get("/user/{user_id}", response_model=list[PromptRead])
def list_user_prompts(user_id: int, db: Session = Depends(get_db)):
    return PromptService.list_user_prompts(db, user_id)


@router.get("/", response_model=list[PromptRead])
def list_all_prompts(db: Session = Depends(get_db)):
    return PromptService.list_all_prompts(db)

