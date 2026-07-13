
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import auth, plants, tasks
from app.core.config import settings
from app.core.database import engine, Base
import app.models  # Memastikan semua model di-import agar ter-register ke metadata

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Auto-create tables di database jika belum ada
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield

app = FastAPI(
    title="TOGA Berdaya API",
    description="Green Knowledge Base API for RW 1 Tingkir Lor - KKN Undip",
    version="1.0.0",
    lifespan=lifespan,
)

if settings.all_cors_origins:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[str(origin).strip("/") for origin in settings.all_cors_origins],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )


app.include_router(auth.router, prefix=f"{settings.api_v1_str}/auth", tags=["auth"])
app.include_router(plants.router, prefix=f"{settings.api_v1_str}/plants", tags=["plants"])
app.include_router(tasks.router, prefix=f"{settings.api_v1_str}/tasks", tags=["tasks"])


@app.get("/health", tags=["health"])
async def health_check():
    return {
        "status": "healthy",
        "project": "TOGA Berdaya",
        "scope": "KKN Multidisiplin 1",
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=settings.PORT, reload=True)