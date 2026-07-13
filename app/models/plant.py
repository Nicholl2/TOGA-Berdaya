from __future__ import annotations
import enum
from datetime import datetime
from typing import Optional, List, TYPE_CHECKING
from sqlalchemy import String, Text, DateTime, func, Enum
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base

if TYPE_CHECKING:
    from app.models.task import MonitoringTask

class PlantType(str, enum.Enum):
    toga = "toga"
    sayuran = "sayuran"
    tanaman_hias = "tanaman_hias"

class Plant(Base):
    __tablename__ = "plants"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(100), unique=True, nullable=False)
    type: Mapped[PlantType] = mapped_column(
        Enum(PlantType, name="plant_type", inherit_schema=True),
        default=PlantType.toga,
        nullable=False
    )
    medical_benefit: Mapped[str] = mapped_column(Text, nullable=False)
    historical_funfact: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    poc_dosage_guideline: Mapped[str] = mapped_column(Text, nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False
    )

    # Relationships
    # Tasks associated with this plant
    tasks: Mapped[List[MonitoringTask]] = relationship(
        "MonitoringTask",
        back_populates="plant",
        cascade="all, delete-orphan",
        lazy="selectin"
    )
