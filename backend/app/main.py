import asyncio
import logging
import time
from collections import defaultdict
from collections.abc import AsyncIterator
from contextlib import asynccontextmanager, suppress

from fastapi import BackgroundTasks, Depends, FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.ext.asyncio import AsyncSession
from starlette.middleware.base import RequestResponseEndpoint
from starlette.responses import JSONResponse, Response

from .config import settings
from .db import (
    Lead,
    cleanup_expired_leads,
    cleanup_expired_leads_once,
    get_session,
)
from .notify import notify_telegram
from .schemas import LeadIn, LeadResponse

logger = logging.getLogger("hihol.intake")


async def retention_worker() -> None:
    while True:
        await asyncio.sleep(settings.retention_sweep_seconds)
        try:
            await cleanup_expired_leads_once()
        except Exception as exc:  # noqa: BLE001 - keep the next scheduled sweep alive
            logger.error("Retention cleanup failed: %s", type(exc).__name__)


@asynccontextmanager
async def lifespan(_app: FastAPI) -> AsyncIterator[None]:
    await cleanup_expired_leads_once()
    retention_task = asyncio.create_task(retention_worker())
    try:
        yield
    finally:
        retention_task.cancel()
        with suppress(asyncio.CancelledError):
            await retention_task


app = FastAPI(title="hihol AI intake API", docs_url=None, redoc_url=None, lifespan=lifespan)
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins,
    allow_methods=["POST", "OPTIONS"],
    allow_headers=["content-type"],
)

_hits: dict[str, list[float]] = defaultdict(list)


@app.middleware("http")
async def limit_request_size(request: Request, call_next: RequestResponseEndpoint) -> Response:
    if request.method == "POST":
        raw_length = request.headers.get("content-length")
        if raw_length:
            try:
                if int(raw_length) > settings.max_request_bytes:
                    return JSONResponse({"detail": "Request too large"}, status_code=413)
            except ValueError:
                return JSONResponse({"detail": "Invalid content length"}, status_code=400)
        if len(await request.body()) > settings.max_request_bytes:
            return JSONResponse({"detail": "Request too large"}, status_code=413)
    return await call_next(request)


def _client_ip(request: Request) -> str:
    forwarded = request.headers.get("x-forwarded-for", "")
    if forwarded:
        return forwarded.split(",", maxsplit=1)[0].strip()
    return request.client.host if request.client else "unknown"


def _rate_limited(ip: str) -> bool:
    now = time.monotonic()
    recent = [hit for hit in _hits[ip] if now - hit < settings.rate_limit_window_seconds]
    _hits[ip] = recent
    if len(recent) >= settings.rate_limit_max:
        return True
    recent.append(now)
    return False


def _validate_origin(request: Request) -> None:
    origin = request.headers.get("origin")
    if origin and origin not in settings.allowed_origins:
        raise HTTPException(status_code=403, detail="Origin not allowed")


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
    _validate_origin(request)
    if payload.website:
        return LeadResponse(ok=True, id=0)

    if _rate_limited(_client_ip(request)):
        raise HTTPException(status_code=429, detail="Too many requests")

    await cleanup_expired_leads(session)
    lead = Lead(
        source=payload.source,
        service_context=payload.service_context,
        process=payload.process,
        desired_result=payload.desired_result,
        frequency=payload.frequency,
        time_spent=payload.time_spent,
        current_tools=payload.current_tools,
        constraints=payload.constraints,
        budget=payload.budget,
        name=payload.name,
        contact=payload.contact,
        company=payload.company,
        consent_personal=payload.consent_personal,
    )
    session.add(lead)
    await session.commit()
    await session.refresh(lead)

    background.add_task(notify_telegram, lead)
    return LeadResponse(ok=True, id=lead.id)
