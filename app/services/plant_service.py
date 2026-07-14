from typing import Optional, List
from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.plant import Plant, PlantType
from app.repositories.plant_repo import PlantRepository
from app.schemas.plant import PlantCreate, PlantUpdate

class PlantService:
    def __init__(self, db: AsyncSession):
        self.db = db
        self.plant_repo = PlantRepository(db)

    async def get_all(self, plant_type: Optional[PlantType] = None) -> List[Plant]:
        return await self.plant_repo.get_all(plant_type)

    async def get_by_id(self, plant_id: int) -> Plant:
        plant = await self.plant_repo.get_by_id(plant_id)
        if not plant:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Tanaman tidak ditemukan"
            )
        return plant

    async def create(self, plant_in: PlantCreate) -> Plant:
        existing = await self.plant_repo.get_by_name(plant_in.name)
        if existing:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Nama tanaman sudah terdaftar"
            )
        
        db_plant = Plant(
            name=plant_in.name,
            type=plant_in.type,
            medical_benefit=plant_in.medical_benefit,
            historical_funfact=plant_in.historical_funfact,
            poc_dosage_guideline=plant_in.poc_dosage_guideline,
            latin_name=plant_in.latin_name
        )
        return await self.plant_repo.create(db_plant)

    async def update(self, plant_id: int, plant_in: PlantUpdate) -> Plant:
        plant = await self.get_by_id(plant_id)
        
        update_data = plant_in.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(plant, field, value)
            
        return await self.plant_repo.update(plant)

    async def delete(self, plant_id: int) -> None:
        plant = await self.get_by_id(plant_id)
        await self.plant_repo.delete(plant)
