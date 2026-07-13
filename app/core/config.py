# app/core/config.py
from typing import List
from pydantic import BeforeValidator
from pydantic_settings import BaseSettings, SettingsConfigDict
from typing_extensions import Annotated

def parse_cors(v: any) -> List[str]:
    if isinstance(v, str) and not v.startswith("["):
        return [i.strip() for i in v.split(",")]
    elif isinstance(v, (list, str)):
        return v
    return []

class Settings(BaseSettings):
    DATABASE_URL: str
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 480
    PORT: int = 8080
    
    # Prefix untuk API versioning lu
    api_v1_str: str = "/api/v1"
    
    # Menghandle input CORS baik berupa string koma (di .env) maupun list asli
    all_cors_origins: Annotated[List[str], BeforeValidator(parse_cors)] = ["*"]

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

settings = Settings()