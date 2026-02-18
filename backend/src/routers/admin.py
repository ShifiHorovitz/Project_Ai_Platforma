from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from config.database import get_db
from src.models import User
from src.routers.auth import get_current_user
from src.schemas import UserRead, PromptRead
from src.services.prompt_service import PromptService
from src.services.user_service import UserService

router = APIRouter(prefix="/admin", tags=["admin"])


def require_admin(current_user: User = Depends(get_current_user)) -> User:
    """Dependency to ensure user is admin."""
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required",
        )
    return current_user


@router.get("/users", response_model=list[UserRead])
def list_all_users(
    db: Session = Depends(get_db),
    admin_user: User = Depends(require_admin),
):
    """List all users (admin only)."""
    return UserService.list_users(db)


@router.get("/prompts", response_model=list[PromptRead])
def list_all_prompts_admin(
    db: Session = Depends(get_db),
    admin_user: User = Depends(require_admin),
):
    """List all prompts (admin only)."""
    return PromptService.list_all_prompts(db)
