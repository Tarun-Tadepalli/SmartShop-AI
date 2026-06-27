from fastapi import APIRouter

from app.schemas.order_schema import (OrderCreate)

from app.services.order_service import (create_order)

from app.services.order_service import (get_customer_orders)

from app.services.order_service import (get_all_orders,update_order_status)

from app.services.order_service import (create_order,request_return)

router = APIRouter()





@router.post("/")

def place_order(
    order: OrderCreate
):

    return create_order(
        order
    )

@router.get("/customer/{email}")

def customer_orders(email: str):

    return get_customer_orders(
        email
    )

@router.get("/")

def all_orders():

    return get_all_orders()

@router.put("/{order_id}")

def update_status(
    order_id: int,
    data: dict
):

    return update_order_status(
        order_id,
        data["status"]
    )

@router.put("/return/{order_id}")

def return_order(order_id:int, data:dict):
    return request_return(
        order_id,
        data["reason"]
    )