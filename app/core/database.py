# app/core/db.py
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from typing import AsyncGenerator
from app.core.config import settings

# Buat engine async
engine = create_async_engine(
    settings.DATABASE_URL,
    echo=True,  # Set False pas production biar ga menuhin log, tapi pas dev ini ngebantu banget ngintip query SQL-nya
    future=True,
    pool_pre_ping=True,
    pool_recycle=1800,
    connect_args={
        "timeout": 30,  # 30 detik untuk batas waktu pembentukan koneksi awal ( Neon cold-start )
        "command_timeout": 30  # 30 detik batas waktu eksekusi query
    }
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
        yield session


from sqlalchemy.orm import DeclarativeBase

class Base(DeclarativeBase):
    pass