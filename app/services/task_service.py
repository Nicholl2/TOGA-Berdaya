from typing import List
from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.task import MonitoringTask, TaskStatus
from app.repositories.task_repo import TaskRepository
from app.schemas.task import TaskCreate

class TaskService:
    def __init__(self, db: AsyncSession):
        self.db = db
        self.task_repo = TaskRepository(db)

    async def get_all(self) -> List[MonitoringTask]:
        return await self.task_repo.get_all()

    async def get_by_id(self, task_id: int) -> MonitoringTask:
        task = await self.task_repo.get_by_id(task_id)
        if not task:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Tugas tidak ditemukan"
            )
        return task

    async def create(self, task_in: TaskCreate) -> MonitoringTask:
        db_task = MonitoringTask(
            plant_id=task_in.plant_id,
            assigned_to=task_in.assigned_to,
            status=task_in.status,
            scheduled_date=task_in.scheduled_date,
            notes=task_in.notes
        )
        return await self.task_repo.create(db_task)

    async def update_status(self, task_id: int, status: TaskStatus) -> MonitoringTask:
        task = await self.task_repo.update_status(task_id, status)
        if not task:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Tugas tidak ditemukan"
            )
        return task
