from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field, ConfigDict
from app.models.plant import PlantType

class PlantBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    latin_name: Optional[str] = Field(default=None)
    type: PlantType = Field(default=PlantType.toga)
    medical_benefit: str = Field(...)
    historical_funfact: Optional[str] = Field(default=None)
    poc_dosage_guideline: str = Field(...)

class PlantCreate(PlantBase):
    pass

class PlantUpdate(BaseModel):
    name: Optional[str] = Field(default=None, min_length=1, max_length=100)
    latin_name: Optional[str] = Field(default=None)
    type: Optional[PlantType] = Field(default=None)
    medical_benefit: Optional[str] = Field(default=None)
    historical_funfact: Optional[str] = Field(default=None)
    poc_dosage_guideline: Optional[str] = Field(default=None)

class PlantResponse(PlantBase):
    id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
