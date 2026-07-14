from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field, ConfigDict
from app.models.user import UserRole

class UserBase(BaseModel):
    username: str = Field(..., min_length=3, max_length=100)
    role: UserRole = Field(default=UserRole.staff)

class UserCreate(UserBase):
    password: str = Field(..., min_length=6, max_length=255)
    created_by: Optional[int] = Field(default=None)

class UserResponse(UserBase):
    id: int
    created_by: Optional[int]
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)

class UserUpdate(BaseModel):
    username: Optional[str] = Field(default=None, min_length=3, max_length=100)
    password: Optional[str] = Field(default=None, min_length=6, max_length=255)
    role: Optional[UserRole] = Field(default=None)
