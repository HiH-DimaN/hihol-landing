from collections.abc import AsyncGenerator
from datetime import UTC, datetime, timedelta

from sqlalchemy import Boolean, DateTime, Integer, String, Text, delete, func
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column

from .config import settings

engine = create_async_engine(settings.database_url, future=True)
SessionLocal = async_sessionmaker(engine, expire_on_commit=False, class_=AsyncSession)


class Base(DeclarativeBase):
    pass


class Lead(Base):
    __tablename__ = "leads"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False, index=True
    )
    source: Mapped[str] = mapped_column(String(64), nullable=False)
    service_context: Mapped[str | None] = mapped_column(String(96))

    process: Mapped[str] = mapped_column(Text, nullable=False)
    desired_result: Mapped[str] = mapped_column(Text, nullable=False)
    frequency: Mapped[str] = mapped_column(String(64), nullable=False)
    time_spent: Mapped[str] = mapped_column(String(64), nullable=False)
    current_tools: Mapped[str | None] = mapped_column(Text)
    constraints: Mapped[str | None] = mapped_column(Text)
    budget: Mapped[str] = mapped_column(String(64), nullable=False)

    name: Mapped[str] = mapped_column(String(255), nullable=False)
    contact: Mapped[str] = mapped_column(String(255), nullable=False)
    company: Mapped[str | None] = mapped_column(String(255))
    consent_personal: Mapped[bool] = mapped_column(Boolean, nullable=False)


async def cleanup_expired_leads(session: AsyncSession) -> None:
    cutoff = datetime.now(UTC) - timedelta(days=settings.retention_days)
    await session.execute(delete(Lead).where(Lead.created_at < cutoff))


async def cleanup_expired_leads_once() -> None:
    async with SessionLocal() as session:
        await cleanup_expired_leads(session)
        await session.commit()


async def get_session() -> AsyncGenerator[AsyncSession, None]:
    async with SessionLocal() as session:
        yield session
