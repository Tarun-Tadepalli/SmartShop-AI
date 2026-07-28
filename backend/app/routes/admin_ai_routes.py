from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Optional


from app.services.admin_ai_service import ask_admin_gemini

router = APIRouter()


class ChatMessage(BaseModel):
    role: str
    text: Optional[str] = ""


class AdminChatRequest(BaseModel):
    question: str
    history: List[ChatMessage] = []


@router.post("/chat")
def admin_chat(request: AdminChatRequest):

    return ask_admin_gemini(

        request.question,

        request.history

    )
