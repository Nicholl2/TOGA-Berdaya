from typing import List, Optional
from fastapi import APIRouter, Depends, Query, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.models.user import User, UserRole
from app.models.plant import PlantType
from app.api.dependencies import check_role
from app.services.plant_service import PlantService
from app.schemas.plant import PlantCreate, PlantUpdate, PlantResponse

router = APIRouter()

@router.get("/", response_model=List[PlantResponse])
async def get_all_plants(
    type: Optional[PlantType] = Query(None),
    db: AsyncSession = Depends(get_db)
):
    plant_service = PlantService(db)
    return await plant_service.get_all(plant_type=type)

@router.get("/{id}", response_model=PlantResponse)
async def get_plant_by_id(
    id: int,
    db: AsyncSession = Depends(get_db)
):
    plant_service = PlantService(db)
    return await plant_service.get_by_id(id)

@router.post("/", response_model=PlantResponse, status_code=status.HTTP_201_CREATED)
async def create_plant(
    plant_in: PlantCreate,
    current_user: User = Depends(check_role([UserRole.admin, UserRole.staff])),
    db: AsyncSession = Depends(get_db)
):
    plant_service = PlantService(db)
    return await plant_service.create(plant_in)

@router.put("/{id}", response_model=PlantResponse)
async def update_plant(
    id: int,
    plant_in: PlantUpdate,
    current_user: User = Depends(check_role([UserRole.admin, UserRole.staff])),
    db: AsyncSession = Depends(get_db)
):
    plant_service = PlantService(db)
    return await plant_service.update(id, plant_in)

@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_plant(
    id: int,
    current_user: User = Depends(check_role([UserRole.admin])),
    db: AsyncSession = Depends(get_db)
):
    plant_service = PlantService(db)
    await plant_service.delete(id)
