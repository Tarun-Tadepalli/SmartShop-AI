from fastapi import APIRouter

from app.services.analytics_service import (analytics_service)
from fastapi.responses import FileResponse

router = APIRouter(
    prefix="/api/analytics",
    tags=["Analytics"]
)


@router.get("/inventory")
def inventory_analysis():

    return (
        analytics_service
        .get_inventory_analysis()
    )

@router.get("/category-chart")
def category_chart():

    chart_path = (
        analytics_service
        .generate_category_chart()
    )

    return FileResponse(
        chart_path
    )