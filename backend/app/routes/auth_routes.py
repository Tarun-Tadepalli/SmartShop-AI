from fastapi import APIRouter

from app.services.auth_service import (
    register_user,
    login_user,
    send_password_reset_otp,
    verify_password_reset_otp,
    change_user_password
)

router = APIRouter()

@router.post("/register")
def register(data: dict):

    return register_user(data)

@router.post("/login")
def login(data: dict):

    return login_user(data)

@router.post("/forgot-password")
def forgot_password(data: dict):

    return send_password_reset_otp(
        data["email"]
    )


@router.post("/verify-otp")
def verify_otp(data: dict):

    valid = verify_password_reset_otp(
        data["email"],
        data["otp"]
    )

    if valid:

        return {
            "success": True,
            "message": "OTP Verified"
        }

    return {
        "success": False,
        "message": "Invalid OTP"
    }


@router.post("/change-password")
def change_password(data: dict):

    change_user_password(
        data["email"],
        data["password"]
    )

    return {
        "success": True,
        "message": "Password Updated Successfully"
    }