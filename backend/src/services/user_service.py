from sqlalchemy import func
from sqlalchemy.orm import Session

from fastapi import HTTPException, status

from src.config.auth import get_password_hash
from src.models import User
from src.schemas import UserCreate


class UserService:
    @staticmethod
    def create_user(db: Session, data: UserCreate) -> User:
        """
        Create a new user with hashed password.
        Raises HTTPException if email already exists.
        """
        try:
            # Validate email format
            if not data.email or '@' not in data.email:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Invalid email format",
                )

            # Check for duplicate email (case-insensitive)
            existing_user = (
                db.query(User)
                .filter(func.lower(User.email) == func.lower(data.email))
                .first()
            )

            if existing_user:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Email already registered",
                )

            if not data.password or len(data.password) < 6:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Password must be at least 6 characters",
                )

            # Create user
            user = User(
                name=data.name.strip(),
                phone=data.phone.strip() if data.phone else None,
                email=data.email.lower().strip(),  # Store email in lowercase
                hashed_password=get_password_hash(data.password),
            )
            db.add(user)
            db.commit()
            db.refresh(user)
            return user
        except HTTPException:
            raise
        except Exception as e:
            db.rollback()
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Failed to create user: {str(e)}"
            )

    @staticmethod
    def list_users(db: Session) -> list[User]:
        return db.query(User).order_by(User.id).all()

    @staticmethod
    def get_user(db: Session, user_id: int) -> User | None:
        return db.get(User, user_id)

