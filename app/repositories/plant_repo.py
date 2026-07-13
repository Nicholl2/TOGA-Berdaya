from typing import Optional, List
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.plant import Plant, PlantType

class PlantRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_all(self, plant_type: Optional[PlantType] = None) -> List[Plant]:
        query = select(Plant)
        if plant_type:
            query = query.where(Plant.type == plant_type)
        result = await self.db.execute(query)
        return list(result.scalars().all())

    async def get_by_id(self, plant_id: int) -> Optional[Plant]:
        result = await self.db.execute(select(Plant).where(Plant.id == plant_id))
        return result.scalars().first()

    async def get_by_name(self, name: str) -> Optional[Plant]:
        result = await self.db.execute(select(Plant).where(Plant.name == name))
        return result.scalars().first()

    async def create(self, plant: Plant) -> Plant:
        self.db.add(plant)
        await self.db.commit()
        await self.db.refresh(plant)
        return plant

    async def update(self, plant: Plant) -> Plant:
        await self.db.commit()
        await self.db.refresh(plant)
        return plant

    async def delete(self, plant: Plant) -> None:
        await self.db.delete(plant)
        await self.db.commit()
