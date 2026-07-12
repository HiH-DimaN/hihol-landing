import time
from collections import defaultdict
from contextlib import asynccontextmanager

from fastapi import BackgroundTasks, Depends, FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.ext.asyncio import AsyncSession

from .config import settings
from .db import Lead, get_session, init_db
from .notify import notify_telegram
from .schemas import LeadIn, LeadResponse


@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    yield


app = FastAPI(title="hihol form API", lifespan=lifespan)

# Defence-in-depth. The service runs on the internal Docker network and is not
# published; restrict Origin in case that ever changes.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://hihol.ru", "https://www.hihol.ru"],
    allow_methods=["POST"],
    allow_headers=["content-type"],
)

# In-memory per-IP sliding window. Single-instance scope (see README).
_hits: dict[str, list[float]] = defaultdict(list)


def _rate_limited(ip: str) -> bool:
    now = time.monotonic()
    window = settings.rate_limit_window_seconds
    recent = [t for t in _hits[ip] if now - t < window]
    _hits[ip] = recent
    if len(recent) >= settings.rate_limit_max:
        return True
    recent.append(now)
    return False


@app.get("/health")
async def health() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/leads", response_model=LeadResponse)
async def create_lead(
    payload: LeadIn,
    request: Request,
    background: BackgroundTasks,
    session: AsyncSession = Depends(get_session),
) -> LeadResponse:
    # Honeypot: pretend success without storing so bots get no signal.
    if payload.website:
        return LeadResponse(ok=True, id=0)

    # payload.ip is set by the trusted same-origin Next proxy from x-forwarded-for.
    # Keep port 8000 internal-only so this value cannot be spoofed (see README).
    ip = payload.ip or (request.client.host if request.client else "unknown")
    if _rate_limited(ip):
        raise HTTPException(status_code=429, detail="Too many requests")

    lead = Lead(
        source=payload.source,
        service_context=payload.service_context,
        name=payload.name.strip(),
        contact=payload.contact.strip(),
        company=payload.company,
        business_sphere=payload.business_sphere,
        task=payload.task,
        budget=payload.budget,
        consent_personal=payload.consent_personal,
        consent_marketing=payload.consent_marketing,
        ip=ip,
        user_agent=payload.user_agent,
    )
    session.add(lead)
    await session.commit()
    await session.refresh(lead)

    background.add_task(notify_telegram, lead)
    return LeadResponse(ok=True, id=lead.id)
