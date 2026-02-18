"""
Authentication service: login, password verification, user lookup.
"""
from sqlalchemy import func
from sqlalchemy.orm import Session

from src.config.auth import create_access_token, get_password_hash, verify_password
from src.models import User
from src.schemas.auth import LoginRequest, Token


class AuthService:
    @staticmethod
    def authenticate_user(db: Session, login_data: LoginRequest) -> User | None:
        """
        Authenticate user by email (case-insensitive) and password.
        Returns User if credentials are valid, None otherwise.
        """
        # Case-insensitive email lookup using LOWER()
        user = (
            db.query(User)
            .filter(func.lower(User.email) == func.lower(login_data.email))
            .first()
        )

        if not user:
            return None

        if not verify_password(login_data.password, user.hashed_password):
            return None

        return user

    @staticmethod
    def login(db: Session, login_data: LoginRequest) -> Token:
        """
        Login user and return JWT token with user info.
        Raises HTTPException if credentials are invalid.
        """
        user = AuthService.authenticate_user(db, login_data)
        if not user:
            from fastapi import HTTPException, status

            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password",
            )

        # Create JWT token with user info
        access_token = create_access_token(
            data={"sub": str(user.id), "is_admin": user.is_admin}
        )

        return Token(
            access_token=access_token,
            token_type="bearer",
            user_id=user.id,
            is_admin=user.is_admin,
        )

    @staticmethod
    def get_user_by_email(db: Session, email: str) -> User | None:
        """Get user by email (case-insensitive)."""
        return (
            db.query(User)
            .filter(func.lower(User.email) == func.lower(email))
            .first()
        )
