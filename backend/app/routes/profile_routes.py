from fastapi import APIRouter

from app.services.profile_service import (change_password)

from app.services.profile_service import (update_profile_image)

from app.services.profile_service import (get_profile)


router = APIRouter()

@router.put("/change-password")
def update_password(data: dict):

    return change_password(data)

@router.put("/image")
def update_image(data: dict):

    return update_profile_image(data)

@router.get("/{email}")
def fetch_profile(email: str):

    return get_profile(email)