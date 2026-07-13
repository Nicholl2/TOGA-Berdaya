from __future__ import annotations
import enum
from datetime import date, datetime
from typing import Optional, TYPE_CHECKING
from sqlalchemy import ForeignKey, Date, DateTime, Text, func, Enum
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base

if TYPE_CHECKING:
    from app.models.plant import Plant
    from app.models.user import User

class TaskStatus(str, enum.Enum):
    pending = "pending"
    in_progress = "in_progress"
    completed = "completed"

class MonitoringTask(Base):
    __tablename__ = "monitoring_tasks"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    plant_id: Mapped[int] = mapped_column(
        ForeignKey("plants.id", ondelete="CASCADE"),
        nullable=False
    )
    assigned_to: Mapped[Optional[int]] = mapped_column(
        ForeignKey("users.id", ondelete="SET NULL"),
        nullable=True
    )
    status: Mapped[TaskStatus] = mapped_column(
        Enum(TaskStatus, name="task_status", inherit_schema=True),
        default=TaskStatus.pending,
        nullable=False
    )
    scheduled_date: Mapped[date] = mapped_column(
        Date,
        nullable=False
    )
    notes: Mapped[Optional[str]] = mapped_column(
        Text,
        nullable=True
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False
    )

    # Relationships
    plant: Mapped[Plant] = relationship(
        "Plant",
        back_populates="tasks",
        lazy="selectin"
    )
    assigned_user: Mapped[Optional[User]] = relationship(
        "User",
        back_populates="assigned_tasks",
        lazy="selectin"
    )
