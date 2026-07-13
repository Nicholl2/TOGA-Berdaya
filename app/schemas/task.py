from datetime import date, datetime
from typing import Optional
from pydantic import BaseModel, Field, ConfigDict
from app.models.task import TaskStatus

class TaskBase(BaseModel):
    plant_id: int
    assigned_to: Optional[int] = Field(default=None)
    status: TaskStatus = Field(default=TaskStatus.pending)
    scheduled_date: date
    notes: Optional[str] = Field(default=None)

class TaskCreate(TaskBase):
    pass

class TaskUpdate(BaseModel):
    status: TaskStatus = Field(...)

class TaskResponse(TaskBase):
    id: int
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
