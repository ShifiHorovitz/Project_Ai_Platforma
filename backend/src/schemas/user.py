from typing import Optional

from pydantic import BaseModel, Field


class UserBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    phone: Optional[str] = Field(None, max_length=50)


class UserCreate(UserBase):
    email: Optional[str] = Field(None)
    password: Optional[str] = Field(None, min_length=6)


class UserRead(UserBase):
    id: int
    email: Optional[str]
    is_admin: bool

    class Config:
        from_attributes = True

