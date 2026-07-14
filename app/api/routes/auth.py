from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.models.user import User, UserRole
from app.api.dependencies import check_role, get_current_user
from app.services.auth_service import AuthService
from app.schemas.auth import Token, LoginRequest, ResetPasswordRequest
from app.schemas.user import UserCreate, UserResponse, UserUpdate

router = APIRouter()

from fastapi.security import OAuth2PasswordRequestForm

@router.post("/login", response_model=Token)
async def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: AsyncSession = Depends(get_db)
):
    auth_service = AuthService(db)
    login_req = LoginRequest(username=form_data.username, password=form_data.password)
    return await auth_service.login(login_req)

@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def register(
    user_in: UserCreate,
    current_admin: User = Depends(check_role([UserRole.admin])),
    db: AsyncSession = Depends(get_db)
):
    auth_service = AuthService(db)
    return await auth_service.register(user_in, creator_id=current_admin.id)

@router.get("/me", response_model=UserResponse)
async def get_me(
    current_user: User = Depends(get_current_user)
):
    return current_user

@router.get("/users", response_model=list[UserResponse])
async def get_users(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    # Retrieve all users from database
    from app.repositories.user_repo import UserRepository
    user_repo = UserRepository(db)
    return await user_repo.get_all()

@router.put("/users/{user_id}", response_model=UserResponse)
async def update_user(
    user_id: int,
    user_in: UserUpdate,
    current_user: User = Depends(check_role([UserRole.admin])),
    db: AsyncSession = Depends(get_db)
):
    from app.repositories.user_repo import UserRepository
    user_repo = UserRepository(db)
    target_user = await user_repo.get_by_id(user_id)
    if not target_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Pengguna tidak ditemukan"
        )
    
    # Validasi agar admin tidak bisa mengedit akun admin lain atau dirinya sendiri
    if target_user.role == UserRole.admin or target_user.id == current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin tidak diperkenankan mengedit akun admin lain atau dirinya sendiri"
        )

    # Lakukan update data
    if user_in.username is not None:
        # Cek jika username baru sudah terpakai oleh user lain
        existing = await user_repo.get_by_username(user_in.username)
        if existing and existing.id != user_id:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Username sudah terdaftar"
            )
        target_user.username = user_in.username
    
    if user_in.password is not None:
        target_user.password_hash = AuthService.hash_password(user_in.password)
        
    if user_in.role is not None:
        target_user.role = user_in.role

    return await user_repo.update(target_user)

@router.post("/reset-password")
async def reset_password(
    req: ResetPasswordRequest,
    db: AsyncSession = Depends(get_db)
):
    from app.repositories.user_repo import UserRepository
    user_repo = UserRepository(db)
    user = await user_repo.get_by_username(req.username)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Username tidak ditemukan"
        )
    
    # Simpan password baru setelah di-hash
    user.password_hash = AuthService.hash_password(req.new_password)
    await user_repo.update(user)
    return {"message": "Password berhasil diubah"}
