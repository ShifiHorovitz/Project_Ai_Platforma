from sqlalchemy import Boolean, Column, Integer, String

from config.database import Base


class User(Base):
    """
    Application user.
    The task requires at least: id, name, phone.
    We also keep email + password + is_admin to allow future auth.
    """

    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    phone = Column(String, nullable=True)

    email = Column(String, unique=True, index=True, nullable=True)
    hashed_password = Column(String, nullable=True)
    is_admin = Column(Boolean, default=False)