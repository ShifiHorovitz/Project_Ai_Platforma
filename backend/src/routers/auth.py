from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session

from config.database import get_db
from src.config.auth import decode_access_token
from src.models import User
from src.schemas.auth import LoginRequest, Token

router = APIRouter(prefix="/auth", tags=["authentication"])
security = HTTPBearer()


async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db),
) -> User:
    """
    Dependency to get the current authenticated user from JWT token.
    Raises HTTPException if token is invalid or user not found.
    """
    token = credentials.credentials
    payload = decode_access_token(token)

    if payload is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

    user_id: int = int(payload.get("sub"))
    user = db.get(User, user_id)

    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found",
        )

    return user


@router.post("/login", response_model=Token)
def login(login_data: LoginRequest, db: Session = Depends(get_db)):
    """Login endpoint: authenticate user and return JWT token."""
    from src.services.auth_service import AuthService

    return AuthService.login(db, login_data)


@router.post("/logout")
def logout():
    """Logout endpoint (client should remove token)."""
    return {"message": "Logged out successfully"}


@router.get("/me")
def get_current_user_info(current_user: User = Depends(get_current_user)):
    """Get current authenticated user info."""
    from src.schemas import UserRead

    return UserRead.model_validate(current_user)
