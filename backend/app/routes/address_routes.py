from fastapi import APIRouter

from app.services.address_service import (
    save_address,
    get_addresses,
    get_address_by_order
)

router = APIRouter()


@router.post("/")
def create_address(data: dict):

    return {
        "address_id":
        save_address(data)
    }


@router.get("/{email}")
def addresses(email: str):

    return get_addresses(email)

@router.get("/order/{order_id}")

def address_by_order(
    order_id:int
):

    return get_address_by_order(
        order_id
    )