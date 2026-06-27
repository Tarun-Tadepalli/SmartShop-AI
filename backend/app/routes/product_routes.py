from fastapi import APIRouter, UploadFile, File, Form
from app.services.product_service import product_service



router = APIRouter()

@router.post("/")
def create_product(data: dict):
    return product_service.create_product(data)

@router.get("/")
def get_products():
    return product_service.get_all_products()

@router.get("/{product_id}")
def get_product(product_id: int):

    return product_service.get_product_by_id(product_id)

@router.put("/{product_id}")
def update_product(product_id:int, data:dict):

    return (product_service.update_product(product_id,data))

@router.delete("/{product_id}")
def delete_product(product_id:int):
    return (product_service.delete_product(product_id))

@router.post("/")
async def create_product(
    product_name: str = Form(...),
    description: str = Form(...),
    price: float = Form(...),
    stock: int = Form(...),
    category: str = Form(...),
    image: UploadFile = File(...)
):

    return await product_service.create_product(
        product_name,
        description,
        price,
        stock,
        category,
        image
    )



    