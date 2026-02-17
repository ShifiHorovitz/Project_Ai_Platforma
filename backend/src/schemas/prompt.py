from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field


class PromptCreate(BaseModel):
    user_id: int
    category_id: int
    sub_category_id: int
    prompt: str = Field(..., min_length=1, max_length=4000)


class PromptRead(BaseModel):
    id: int
    user_id: int
    category_id: int
    sub_category_id: int
    prompt: str
    response: str
    created_at: datetime

    class Config:
        from_attributes = True


class PromptFilter(BaseModel):
    user_id: Optional[int] = None
    category_id: Optional[int] = None
    sub_category_id: Optional[int] = None

