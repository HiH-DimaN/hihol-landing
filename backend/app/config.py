from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    # Default is a local SQLite file; production sets a postgresql+asyncpg URL.
    database_url: str = "sqlite+aiosqlite:///./leads.db"

    telegram_bot_token: str = ""
    telegram_chat_id: str = ""

    # Simple in-memory throttle: max submissions per IP within the window.
    rate_limit_max: int = 5
    rate_limit_window_seconds: int = 600


settings = Settings()
