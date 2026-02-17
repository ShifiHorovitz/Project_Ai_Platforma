from sqlalchemy.orm import Session

from src.models import User
from src.schemas import UserCreate


class UserService:
    @staticmethod
    def create_user(db: Session, data: UserCreate) -> User:
        user = User(
            name=data.name,
            phone=data.phone,
            email=data.email,
            # For the purposes of this assignment we won't hash the password,
            # but in a real system this must be hashed.
            hashed_password=data.password,
        )
        db.add(user)
        db.commit()
        db.refresh(user)
        return user

    @staticmethod
    def list_users(db: Session) -> list[User]:
        return db.query(User).order_by(User.id).all()

    @staticmethod
    def get_user(db: Session, user_id: int) -> User | None:
        return db.get(User, user_id)

