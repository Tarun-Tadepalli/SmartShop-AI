from fastapi import APIRouter

from app.services.dashboard_service import (
    dashboard_service
)

router = APIRouter(
    prefix="/api/dashboard",
    tags=["Dashboard"]
)


@router.get("/stats")
def get_dashboard_stats():

    return dashboard_service.get_stats()
    