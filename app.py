import logging
import os
from pathlib import Path

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.responses import FileResponse, JSONResponse
from openai import OpenAI
from pydantic import BaseModel

load_dotenv()

SYSTEM_PROMPT = "You are a knowledgeable, practical social media strategist. You help people plan and grow their presence across platforms (Instagram, TikTok, LinkedIn, Facebook, Pinterest, YouTube, X) — content pillars, posting cadence, captions and hooks, hashtag strategy, audience growth tactics, engagement best practices, repurposing content across platforms, and reading basic analytics (reach, engagement rate, saves, shares) to decide what to do next. You give concrete, actionable suggestions tailored to the platform and audience the user describes, not generic advice. You are not a substitute for a paid marketing agency, a legal advisor on advertising/IP/FTC disclosure rules, or a platform's own official policies — flag when something needs a specialist or a check against current platform guidelines (algorithms, ad policies, and features change often). Give complete answers, but keep them concise and easy to scan. Use short sections with clear headings or 3–5 bullet points. Avoid long paragraphs and wall-of-text responses. Cover the core points needed to answer the question fully, while staying compact. For plans, include the main idea, key actions, and a simple example. For captions, give a useful complete caption. For strategy, provide the recommendation, the content mix, and the next steps. Make every answer practical, readable, and not incomplete."


class ChatMessage(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    messages: list[ChatMessage]


def _normalize_azure_endpoint(raw_endpoint: str) -> str:
    endpoint = raw_endpoint.strip().rstrip("/")

    if endpoint.endswith("/openai/v1"):
        return endpoint

    if "/api/projects/" in endpoint:
        base = endpoint.split("/api/projects/", 1)[0]
        return f"{base}/openai/v1"

    if endpoint.endswith("/openai"):
        return f"{endpoint}/v1"

    return f"{endpoint}/openai/v1"


def _get_azure_config() -> tuple[str, str, str]:
    endpoint = os.getenv("AZURE_ENDPOINT")
    deployment = os.getenv("AZURE_DEPLOYMENT")
    api_key = os.getenv("AZURE_API_KEY")

    if not endpoint or not deployment or not api_key:
        raise RuntimeError("Missing Azure configuration: AZURE_ENDPOINT, AZURE_DEPLOYMENT, and AZURE_API_KEY must all be set.")

    return _normalize_azure_endpoint(endpoint), deployment, api_key


app = FastAPI(title="Social Media Strategist Chatbot")


@app.get("/")
def read_root() -> FileResponse:
    return FileResponse(Path(__file__).parent / "index.html")


@app.post("/chat")
async def chat(request: ChatRequest):
    try:
        endpoint, deployment, api_key = _get_azure_config()
        client = OpenAI(base_url=endpoint, api_key=api_key)

        messages = [{"role": "system", "content": SYSTEM_PROMPT}]
        messages.extend({"role": msg.role, "content": msg.content} for msg in request.messages)

        completion = client.chat.completions.create(
            model=deployment,
            messages=messages,
        )

        reply = ""
        if completion.choices and completion.choices[0].message is not None:
            reply = completion.choices[0].message.content or ""

        return {"reply": reply.strip() or "I’m ready to help with your social strategy—what are you trying to grow?"}
    except Exception:
        logging.exception("Chat request failed")
        return JSONResponse(
            status_code=500,
            content={"detail": "Sorry, I'm having trouble answering right now..."},
        )
