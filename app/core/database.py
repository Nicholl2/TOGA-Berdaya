# app/core/db.py
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from typing import AsyncGenerator
from app.core.config import settings

# Buat engine async
engine = create_async_engine(
    settings.DATABASE_URL,
    echo=True,  # Set False pas production biar ga menuhin log, tapi pas dev ini ngebantu banget ngintip query SQL-nya
    future=True
)

# Buat session factory async
AsyncSessionLocal = async_sessionmaker(
    bind=engine,
    autocommit=False,
    autoflush=False,
    expire_on_commit=False
)

# Dependency untuk inject DB session ke route FastAPI
async def get_db() -> AsyncGenerator[AsyncSession, None]:
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()