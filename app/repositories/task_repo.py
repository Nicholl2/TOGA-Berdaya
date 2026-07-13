from typing import Optional, List
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.task import MonitoringTask, TaskStatus

class TaskRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_all(self) -> List[MonitoringTask]:
        result = await self.db.execute(select(MonitoringTask))
        return list(result.scalars().all())

    async def get_by_id(self, task_id: int) -> Optional[MonitoringTask]:
        result = await self.db.execute(select(MonitoringTask).where(MonitoringTask.id == task_id))
        return result.scalars().first()

    async def create(self, task: MonitoringTask) -> MonitoringTask:
        self.db.add(task)
        await self.db.commit()
        await self.db.refresh(task)
        return task

    async def update_status(self, task_id: int, status: TaskStatus) -> Optional[MonitoringTask]:
        task = await self.get_by_id(task_id)
        if task:
            task.status = status
            await self.db.commit()
            await self.db.refresh(task)
        return task

    async def delete(self, task: MonitoringTask) -> None:
        await self.db.delete(task)
        await self.db.commit()
