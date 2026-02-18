from pydantic import BaseModel, EmailStr, Field


class LoginRequest(BaseModel):
    email: EmailStr = Field(..., description="User email address")
    password: str = Field(..., min_length=6, description="User password")


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user_id: int
    is_admin: bool


class TokenData(BaseModel):
    user_id: int | None = None
    is_admin: bool = False
