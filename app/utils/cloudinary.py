import cloudinary
import cloudinary.uploader
from fastapi import UploadFile, HTTPException, status
import anyio
from app.core.config import settings

# Konfigurasi Cloudinary jika variabel tersedia
if settings.CLOUDINARY_CLOUD_NAME and settings.CLOUDINARY_API_KEY and settings.CLOUDINARY_API_SECRET:
    cloudinary.config(
        cloud_name=settings.CLOUDINARY_CLOUD_NAME,
        api_key=settings.CLOUDINARY_API_KEY,
        api_secret=settings.CLOUDINARY_API_SECRET,
        secure=True
    )

def _upload_sync(file_bytes: bytes) -> str:
    if not settings.CLOUDINARY_CLOUD_NAME or not settings.CLOUDINARY_API_KEY or not settings.CLOUDINARY_API_SECRET:
        raise ValueError("Kredensial Cloudinary belum dikonfigurasi.")
    
    response = cloudinary.uploader.upload(
        file_bytes,
        folder="toga_berdaya/plants"
    )
    return response.get("secure_url")

async def upload_image_to_cloudinary(file: UploadFile) -> str:
    """
    Mengunggah file UploadFile secara asinkron ke Cloudinary
    dan mengembalikan URL aman (secure_url).
    """
    if not file:
        return None
    
    if not settings.CLOUDINARY_CLOUD_NAME or not settings.CLOUDINARY_API_KEY or not settings.CLOUDINARY_API_SECRET:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Cloudinary belum dikonfigurasi. Silakan atur CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, dan CLOUDINARY_API_SECRET."
        )
    
    try:
        # Membaca byte file secara asinkron
        file_bytes = await file.read()
        
        # Menjalankan fungsi upload sinkron Cloudinary di threadpool terpisah
        # agar tidak memblokir event loop utama FastAPI.
        secure_url = await anyio.to_thread.run_sync(_upload_sync, file_bytes)
        return secure_url
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Gagal mengunggah gambar ke Cloudinary: {str(e)}"
        )
    finally:
        # Reset cursor file agar bisa dibaca ulang di tempat lain jika diperlukan
        await file.seek(0)
