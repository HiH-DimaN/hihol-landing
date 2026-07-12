from pydantic import BaseModel, Field, field_validator


class LeadIn(BaseModel):
    name: str = Field(min_length=1, max_length=255)
    contact: str = Field(min_length=1, max_length=255)
    company: str | None = Field(default=None, max_length=255)
    business_sphere: str | None = Field(default=None, max_length=255)
    task: str | None = Field(default=None, max_length=5000)
    budget: str | None = Field(default=None, max_length=64)

    source: str | None = Field(default=None, max_length=64)
    service_context: str | None = Field(default=None, max_length=255)

    consent_personal: bool
    consent_marketing: bool = False

    # Honeypot: real users never fill this hidden field. Bots often do.
    website: str = ""

    # Set server-side by the Next.js proxy from request headers.
    ip: str | None = Field(default=None, max_length=64)
    user_agent: str | None = Field(default=None, max_length=512)

    @field_validator("consent_personal")
    @classmethod
    def consent_required(cls, v: bool) -> bool:
        if v is not True:
            raise ValueError("consent_personal must be granted")
        return v


class LeadResponse(BaseModel):
    ok: bool = True
    id: int
