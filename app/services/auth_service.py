from datetime import datetime, timedelta
from typing import Optional
from fastapi import HTTPException, status
from jose import jwt
from passlib.context import CryptContext
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.models.user import User
from app.repositories.user_repo import UserRepository
from app.schemas.auth import Token, LoginRequest
from app.schemas.user import UserCreate

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class AuthService:
    def __init__(self, db: AsyncSession):
        self.db = db
        self.user_repo = UserRepository(db)

    @staticmethod
    def hash_password(password: str) -> str:
        return pwd_context.hash(password)

    @staticmethod
    def verify_password(plain_password: str, hashed_password: str) -> bool:
        return pwd_context.verify(plain_password, hashed_password)

    @staticmethod
    def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
        to_encode = data.copy()
        if expires_delta:
            expire = datetime.utcnow() + expires_delta
        else:
            expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
        to_encode.update({"exp": expire})
        return jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)

    async def login(self, login_req: LoginRequest) -> Token:
        user = await self.user_repo.get_by_username(login_req.username)
        if not user or not self.verify_password(login_req.password, user.password_hash):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Username atau password salah",
                headers={"WWW-Authenticate": "Bearer"},
            )
        
        token_data = {
            "sub": user.username,
            "role": user.role.value
        }
        access_token = self.create_access_token(token_data)
        return Token(access_token=access_token, token_type="bearer")

    async def register(self, user_in: UserCreate, creator_id: Optional[int]) -> User:
        existing = await self.user_repo.get_by_username(user_in.username)
        if existing:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Username sudah terdaftar"
            )
        
        hashed_password = self.hash_password(user_in.password)
        db_user = User(
            username=user_in.username,
            password_hash=hashed_password,
            role=user_in.role,
            created_by=creator_id
        )
        return await self.user_repo.create(db_user)
