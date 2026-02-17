from pydantic import BaseModel, Field


class CategoryBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)


class CategoryCreate(CategoryBase):
    pass


class CategoryRead(CategoryBase):
    id: int

    class Config:
        from_attributes = True


class SubCategoryBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    category_id: int


class SubCategoryCreate(SubCategoryBase):
    pass


class SubCategoryRead(SubCategoryBase):
    id: int

    class Config:
        from_attributes = True

