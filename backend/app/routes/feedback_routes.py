from fastapi import APIRouter

from app.services.feedback_service import (add_feedback,get_feedback_by_order)

router = APIRouter(prefix="/api/feedback")

@router.post("/")
def save_feedback(data: dict):

    class Feedback: pass

    obj = Feedback()
    
    obj.order_id = data["order_id"]

    obj.customer_email = data["customer_email"]

    obj.product_id = data["product_id"]

    obj.product_name = data["product_name"]

    obj.rating = data["rating"]

    obj.review = data["review"]

    return add_feedback(obj)

@router.get("/{order_id}")

def view_feedback(order_id:int):

    return get_feedback_by_order(
        order_id
    )