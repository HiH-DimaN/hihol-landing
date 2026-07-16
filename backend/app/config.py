from pydantic_settings import BaseSettings, SettingsConfigDict


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
