from sqlalchemy.orm import Session

from src.models import Category, SubCategory
from src.schemas import CategoryCreate, SubCategoryCreate


class CategoryService:
    @staticmethod
    def create_category(db: Session, data: CategoryCreate) -> Category:
        category = Category(name=data.name)
        db.add(category)
        db.commit()
        db.refresh(category)
        return category

    @staticmethod
    def list_categories(db: Session) -> list[Category]:
        return db.query(Category).order_by(Category.name).all()

    @staticmethod
    def create_sub_category(db: Session, data: SubCategoryCreate) -> SubCategory:
        sub = SubCategory(name=data.name, category_id=data.category_id)
        db.add(sub)
        db.commit()
        db.refresh(sub)
        return sub

    @staticmethod
    def list_sub_categories(db: Session, category_id: int | None = None) -> list[SubCategory]:
        query = db.query(SubCategory)
        if category_id is not None:
            query = query.filter(SubCategory.category_id == category_id)
        return query.order_by(SubCategory.name).all()

