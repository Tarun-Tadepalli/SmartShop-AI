from fastapi import APIRouter
from pydantic import BaseModel

from app.services.ai_service import ask_gemini

from typing import List, Optional

router = APIRouter()


class ChatMessage(BaseModel):
    role: str
    text: Optional[str] = ""

class ChatRequest(BaseModel):
    question: str
    history: List[ChatMessage] = []


@router.post("/chat")
def chat(request: ChatRequest):

    return ask_gemini(

        request.question,

        request.history

    )