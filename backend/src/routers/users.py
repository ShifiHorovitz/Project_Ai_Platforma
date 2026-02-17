from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from config.database import get_db
from src.schemas import UserCreate, UserRead
from src.services.user_service import UserService

router = APIRouter(prefix="/users", tags=["users"])


@router.post("/", response_model=UserRead, status_code=status.HTTP_201_CREATED)
def register_user(payload: UserCreate, db: Session = Depends(get_db)):
    user = UserService.create_user(db, payload)
    return user


@router.get("/", response_model=list[UserRead])
def list_users(db: Session = Depends(get_db)):
    return UserService.list_users(db)

