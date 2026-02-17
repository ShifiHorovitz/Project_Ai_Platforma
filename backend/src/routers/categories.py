from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from config.database import get_db
from src.schemas import (
    CategoryCreate,
    CategoryRead,
    SubCategoryCreate,
    SubCategoryRead,
)
from src.services.category_service import CategoryService

router = APIRouter(prefix="/categories", tags=["categories"])


@router.post("/", response_model=CategoryRead)
def create_category(payload: CategoryCreate, db: Session = Depends(get_db)):
    return CategoryService.create_category(db, payload)


@router.get("/", response_model=list[CategoryRead])
def list_categories(db: Session = Depends(get_db)):
    return CategoryService.list_categories(db)


@router.post("/sub", response_model=SubCategoryRead)
def create_sub_category(payload: SubCategoryCreate, db: Session = Depends(get_db)):
    return CategoryService.create_sub_category(db, payload)


@router.get("/sub", response_model=list[SubCategoryRead])
def list_sub_categories(category_id: int | None = None, db: Session = Depends(get_db)):
    return CategoryService.list_sub_categories(db, category_id)

