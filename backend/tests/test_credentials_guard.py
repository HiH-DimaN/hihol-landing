"""Guard against the 2026-08-20 misconfiguration: production ran with the
compose placeholder text as database user and password."""

import pytest

from app.config import assert_database_credentials

PLACEHOLDER_URL = (
    "postgresql+asyncpg://set%20POSTGRES_USER:set%20POSTGRES_PASSWORD@db:5432/set%20POSTGRES_DB"
)


def test_rejects_compose_placeholder_credentials() -> None:
    with pytest.raises(RuntimeError) as excinfo:
        assert_database_credentials(PLACEHOLDER_URL)
    message = str(excinfo.value)
    assert "placeholder" in message
    assert "POSTGRES_PASSWORD" in message  # actionable: names what to set
    assert "set%20POSTGRES_PASSWORD" not in message  # never echoes the value


@pytest.mark.parametrize("password", ["", "postgres", "password", "changeme", "ADMIN"])
def test_rejects_weak_password(password: str) -> None:
    url = f"postgresql+asyncpg://intake:{password}@db:5432/intake"
    with pytest.raises(RuntimeError, match="empty or a well-known default"):
        assert_database_credentials(url)


def test_accepts_real_credentials() -> None:
    assert_database_credentials(
        "postgresql+asyncpg://hihol_intake:Xk7%2FqR2mB9wTpLzE4nVd@db:5432/hihol_intake"
    )


def test_ignores_sqlite_used_by_tests_and_local_runs() -> None:
    assert_database_credentials("sqlite+aiosqlite:///./leads.db")
