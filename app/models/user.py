from __future__ import annotations
import enum
from datetime import datetime
from typing import Optional, List, TYPE_CHECKING
from sqlalchemy import String, ForeignKey, DateTime, func, Enum
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base

if TYPE_CHECKING:
    from app.models.task import MonitoringTask

class UserRole(str, enum.Enum):
    admin = "admin"
    staff = "staff"
    observer = "observer"

class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    username: Mapped[str] = mapped_column(String(100), unique=True, nullable=False)
    password_hash: Mapped[str] = mapped_column(String(255), nullable=False)
    role: Mapped[UserRole] = mapped_column(
        Enum(UserRole, name="user_role", inherit_schema=True),
        default=UserRole.staff,
        nullable=False
    )
    created_by: Mapped[Optional[int]] = mapped_column(
        ForeignKey("users.id", ondelete="SET NULL"),
        nullable=True
    )
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False
    )

    # Self-reference relationship: who created this user
    creator: Mapped[Optional[User]] = relationship(
        "User",
        remote_side=[id],
        back_populates="created_users",
        lazy="selectin"
    )

    # Users created by this user
    created_users: Mapped[List[User]] = relationship(
        "User",
        back_populates="creator",
        lazy="selectin"
    )

    # Tasks assigned to this user
    assigned_tasks: Mapped[List[MonitoringTask]] = relationship(
        "MonitoringTask",
        back_populates="assigned_user",
        lazy="selectin"
    )
