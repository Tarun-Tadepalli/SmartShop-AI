from fastapi import APIRouter
from fastapi import UploadFile
from fastapi import File

from app.services.azure_blob_service import azure_blob_service


router = APIRouter()


@router.post("/product-image")
async def upload_product_image(
    image: UploadFile = File(...)
):

    image_url = (
        azure_blob_service.upload_product_image(image)
    )

    return {
        "image_url": image_url
    }

@router.post("/profile-image")
async def upload_profile_image(
    image: UploadFile = File(...)
):

    image_url = (
        azure_blob_service.upload_profile_image(image)
    )

    return {
        "image_url": image_url
    }