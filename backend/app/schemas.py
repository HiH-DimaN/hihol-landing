from typing import Literal

from pydantic import BaseModel, Field, field_validator

Frequency = Literal[
    "до 5 раз в месяц",
    "1–5 раз в неделю",
    "ежедневно",
    "несколько раз в день",
    "пока не знаю",
]
TimeSpent = Literal[
    "до 2 часов в месяц",
    "2–8 часов в месяц",
    "1–5 часов в неделю",
    "более 5 часов в неделю",
    "пока не знаю",
]
Budget = Literal[
    "до 50 тыс. ₽",
    "50–150 тыс. ₽",
    "150–320 тыс. ₽",
    "больше 320 тыс. ₽",
    "пока не знаю",
]


class LeadIn(BaseModel):
    process: str = Field(min_length=20, max_length=2000)
    desired_result: str = Field(min_length=10, max_length=1500)
    frequency: Frequency
    time_spent: TimeSpent
    current_tools: str | None = Field(default=None, max_length=1000)
    constraints: str | None = Field(default=None, max_length=1000)
    budget: Budget

    name: str = Field(min_length=2, max_length=255)
    contact: str = Field(min_length=3, max_length=255)
    company: str | None = Field(default=None, max_length=255)
    consent_personal: bool

    source: str = Field(default="direct", min_length=1, max_length=64, pattern=r"^[a-z0-9_-]+$")
    service_context: str | None = Field(default=None, max_length=96, pattern=r"^[a-z0-9_-]+$")
    website: str = Field(default="", max_length=255)

    @field_validator("process", "desired_result", "name", "contact")
    @classmethod
    def strip_required_text(cls, value: str) -> str:
        value = value.strip()
        if not value:
            raise ValueError("value must not be blank")
        return value

    @field_validator("current_tools", "constraints", "company", mode="before")
    @classmethod
    def empty_to_none(cls, value: object) -> object:
        if isinstance(value, str):
            value = value.strip()
            return value or None
        return value

    @field_validator("consent_personal")
    @classmethod
    def consent_required(cls, value: bool) -> bool:
        if value is not True:
            raise ValueError("consent_personal must be granted")
        return value


class LeadResponse(BaseModel):
    ok: bool = True
    id: int
