from fastapi import APIRouter

from app.services.profile_service import (change_password)

from app.services.profile_service import (update_profile_image)

from app.services.profile_service import (get_profile, get_all_users, delete_user)


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

@router.get("/admin/users")
def fetch_all_users():

    return get_all_users()


@router.delete("/admin/user/{user_id}")
def remove_user(user_id:int):

    return delete_user(user_id)