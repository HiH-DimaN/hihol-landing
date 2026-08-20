from urllib.parse import unquote, urlsplit

from pydantic_settings import BaseSettings, SettingsConfigDict

# Coolify does not honour the `${VAR:?message}` compose syntax: instead of
# refusing to start it substitutes the message text as the value. On
# 2026-08-20 production had been running with user/password literally equal to
# "set POSTGRES_USER" / "set POSTGRES_PASSWORD" - a password published in the
# repository. The guard below turns that class of misconfiguration into a
# refusal to start instead of a silent, publicly guessable credential.
_PLACEHOLDER_MARKER = "set postgres"
_WEAK_PASSWORDS = frozenset({"", "postgres", "password", "changeme", "admin", "secret"})


def assert_database_credentials(url: str) -> None:
    """Fail closed on placeholder or trivially guessable database credentials.

    No credential value is ever included in the error - only what is wrong.
    """
    if not url.startswith(("postgresql", "postgres://")):
        return  # sqlite in tests and local runs carries no secret

    parsed = urlsplit(url)
    user = unquote(parsed.username or "")
    password = unquote(parsed.password or "")
    database = parsed.path.lstrip("/")

    problems: list[str] = []
    for label, value in (("user", user), ("password", password), ("database", database)):
        if _PLACEHOLDER_MARKER in value.lower():
            problems.append(f"{label} still holds the compose placeholder text")
    if password.lower() in _WEAK_PASSWORDS:
        problems.append("password is empty or a well-known default")

    if problems:
        raise RuntimeError(
            "Refusing to start: unsafe database credentials - "
            + "; ".join(problems)
            + ". WHY: the database stores personal data from the intake form. "
            "FIX: set POSTGRES_USER, POSTGRES_PASSWORD and POSTGRES_DB to real "
            "values in the Coolify environment of the application, then redeploy. "
            "See docs/RUNBOOK.md, section 'Переменные окружения'."
        )


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    database_url: str = "sqlite+aiosqlite:///./leads.db"
    telegram_bot_token: str = ""
    telegram_chat_id: str = ""
    allowed_origins_csv: str = "https://hihol.ru,https://www.hihol.ru"
    rate_limit_max: int = 5
    rate_limit_window_seconds: int = 600
    max_request_bytes: int = 32768
    retention_days: int = 365
    retention_sweep_seconds: int = 86400

    @property
    def allowed_origins(self) -> list[str]:
        return [origin.strip() for origin in self.allowed_origins_csv.split(",") if origin.strip()]


settings = Settings()
