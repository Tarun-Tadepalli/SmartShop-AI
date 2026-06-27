from pydantic import BaseModel


class OrderCreate(BaseModel):

    customer_email: str

    product_id: int

    product_name: str

    quantity: int

    total_amount: float

    address_id: int