from fastapi import APIRouter

from app.services.auth_service import (
    register_user,
    login_user
)

router = APIRouter()

@router.post("/register")
def register(data: dict):

    return register_user(data)

@router.post("/login")
def login(data: dict):

    return login_user(data)