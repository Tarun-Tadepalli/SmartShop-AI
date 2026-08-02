from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.auth_routes import router as auth_router
from app.routes.product_routes import router as product_router
from app.routes.dashboard_routes import router as dashboard_router
from app.routes.analytics_routes import router as analytics_router
from app.routes.order_routes import router as order_router
from app.routes.feedback_routes import router as feedback_router
from app.routes.address_routes import router as address_router
from app.routes.profile_routes import router as profile_router
from app.routes.upload_routes import router as upload_router
from app.routes.ai_routes import router as ai_router
from app.routes.admin_ai_routes import router as admin_ai_router

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
    "http://localhost:5173",
    "https://happy-desert-06fafd400.7.azurestaticapps.net",
    "https://smart-shop-ai-brown.vercel.app",
]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
    #aaproject
app.include_router(
    auth_router,
    prefix="/api/auth",
    tags=["Authentication"]
)
app.include_router(
    product_router,
    prefix="/api/products",
    tags=["Products"]
)

app.include_router(
    dashboard_router
)

app.include_router(
    analytics_router
)

app.include_router(
    order_router,
    prefix="/api/orders",
    tags=["Orders"]
)

app.include_router(
    feedback_router
)

app.include_router(
    address_router,
    prefix="/api/addresses",
    tags=["Addresses"]
)

app.include_router(
    profile_router,
    prefix="/api/profile",
    tags=["Profile"]
)

app.include_router(
    upload_router,
    prefix="/api/upload",
    tags=["Upload"]
)

app.include_router(
    ai_router,
    prefix="/api/ai",
    tags=["AI Assistant"]
)

app.include_router(
    admin_ai_router,
    prefix="/api/admin-ai",
    tags=["Admin AI"]
)

@app.get("/")
def home():
    return {
        "message":
        "SmartShop AI Backend Running"
    }

