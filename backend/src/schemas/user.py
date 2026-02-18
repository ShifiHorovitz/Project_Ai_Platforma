from typing import Optional

from pydantic import BaseModel, Field


class UserBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    phone: Optional[str] = Field(None, max_length=50)


class UserCreate(UserBase):
    email: str = Field(..., description="User email address")
    password: str = Field(..., min_length=6, description="User password")


class UserRead(UserBase):
    id: int
    email: Optional[str]
    is_admin: bool

    class Config:
        from_attributes = True

