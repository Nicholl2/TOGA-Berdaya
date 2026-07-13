from typing import List
from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.models.user import User, UserRole
from app.api.dependencies import check_role
from app.services.task_service import TaskService
from app.schemas.task import TaskCreate, TaskUpdate, TaskResponse

router = APIRouter()

@router.get("/", response_model=List[TaskResponse])
async def get_all_tasks(
    db: AsyncSession = Depends(get_db)
):
    task_service = TaskService(db)
    return await task_service.get_all()

@router.post("/", response_model=TaskResponse, status_code=status.HTTP_201_CREATED)
async def create_task(
    task_in: TaskCreate,
    current_user: User = Depends(check_role([UserRole.admin])),
    db: AsyncSession = Depends(get_db)
):
    task_service = TaskService(db)
    return await task_service.create(task_in)

@router.patch("/{id}/status", response_model=TaskResponse)
async def update_task_status(
    id: int,
    task_in: TaskUpdate,
    current_user: User = Depends(check_role([UserRole.staff, UserRole.admin])),
    db: AsyncSession = Depends(get_db)
):
    task_service = TaskService(db)
    return await task_service.update_status(id, task_in.status)
