from typing import List, Optional
from fastapi import APIRouter, Depends, Query, status, Form, File, UploadFile
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.models.user import User, UserRole
from app.models.plant import PlantType
from app.api.dependencies import check_role
from app.services.plant_service import PlantService
from app.schemas.plant import PlantCreate, PlantUpdate, PlantResponse

router = APIRouter()

@router.get("", response_model=List[PlantResponse])
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

@router.post("", response_model=PlantResponse, status_code=status.HTTP_201_CREATED)
async def create_plant(
    name: str = Form(...),
    type: str = Form(...),
    medical_benefit: str = Form(...),
    historical_funfact: Optional[str] = Form(None),
    poc_dosage_guideline: str = Form(...),
    latin_name: Optional[str] = Form(None),
    image: Optional[UploadFile] = File(None),
    current_user: User = Depends(check_role([UserRole.admin, UserRole.staff])),
    db: AsyncSession = Depends(get_db)
):
    plant_in = PlantCreate(
        name=name,
        type=type,
        medical_benefit=medical_benefit,
        historical_funfact=historical_funfact,
        poc_dosage_guideline=poc_dosage_guideline,
        latin_name=latin_name
    )
    plant_service = PlantService(db)
    return await plant_service.create(plant_in)

@router.put("/{id}", response_model=PlantResponse)
async def update_plant(
    id: int,
    name: Optional[str] = Form(None),
    type: Optional[str] = Form(None),
    medical_benefit: Optional[str] = Form(None),
    historical_funfact: Optional[str] = Form(None),
    poc_dosage_guideline: Optional[str] = Form(None),
    latin_name: Optional[str] = Form(None),
    image: Optional[UploadFile] = File(None),
    current_user: User = Depends(check_role([UserRole.admin, UserRole.staff])),
    db: AsyncSession = Depends(get_db)
):
    # Construct updating dict manually to dump exclude_unset equivalent
    update_data = {}
    if name is not None:
        update_data["name"] = name
    if type is not None:
        update_data["type"] = type
    if medical_benefit is not None:
        update_data["medical_benefit"] = medical_benefit
    if historical_funfact is not None:
        update_data["historical_funfact"] = historical_funfact
    if poc_dosage_guideline is not None:
        update_data["poc_dosage_guideline"] = poc_dosage_guideline
    if latin_name is not None:
        update_data["latin_name"] = latin_name

    plant_in = PlantUpdate(**update_data)
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
