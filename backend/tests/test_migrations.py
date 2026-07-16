import os
import sqlite3
import subprocess
import sys
from pathlib import Path

BACKEND_ROOT = Path(__file__).parents[1]
ALEMBIC_CONFIG = BACKEND_ROOT / "alembic.ini"
EXPECTED_LEAD_COLUMNS = {
    "id",
    "created_at",
    "source",
    "service_context",
    "process",
    "desired_result",
    "frequency",
    "time_spent",
    "current_tools",
    "constraints",
    "budget",
    "name",
    "contact",
    "company",
    "consent_personal",
}


def run_alembic(database_path: Path, *arguments: str) -> subprocess.CompletedProcess[str]:
    environment = os.environ.copy()
    environment["DATABASE_URL"] = f"sqlite+aiosqlite:///{database_path}"
    return subprocess.run(
        [sys.executable, "-m", "alembic", "-c", str(ALEMBIC_CONFIG), *arguments],
        cwd=BACKEND_ROOT,
        env=environment,
        capture_output=True,
        text=True,
        check=False,
    )


def assert_succeeded(result: subprocess.CompletedProcess[str]) -> None:
    assert result.returncode == 0, f"stdout:\n{result.stdout}\nstderr:\n{result.stderr}"


def test_initial_migration_roundtrip_matches_model(tmp_path: Path) -> None:
    database_path = tmp_path / "migration-roundtrip.db"

    assert_succeeded(run_alembic(database_path, "upgrade", "head"))

    with sqlite3.connect(database_path) as connection:
        columns = {row[1] for row in connection.execute("PRAGMA table_info(leads)")}
        indexes = {row[1] for row in connection.execute("PRAGMA index_list(leads)")}
        revision = connection.execute("SELECT version_num FROM alembic_version").fetchone()

    assert columns == EXPECTED_LEAD_COLUMNS
    assert "ix_leads_created_at" in indexes
    assert revision == ("20260716_0001",)

    assert_succeeded(run_alembic(database_path, "current", "--check-heads"))
    assert_succeeded(run_alembic(database_path, "check"))
    assert_succeeded(run_alembic(database_path, "downgrade", "base"))

    with sqlite3.connect(database_path) as connection:
        table = connection.execute(
            "SELECT name FROM sqlite_master WHERE type = 'table' AND name = 'leads'"
        ).fetchone()
    assert table is None

    behind_head = run_alembic(database_path, "current", "--check-heads")
    assert behind_head.returncode != 0
    assert "not on all head revisions" in (behind_head.stdout + behind_head.stderr).lower()


def test_entrypoint_migrates_before_starting_api() -> None:
    entrypoint = (BACKEND_ROOT / "entrypoint.sh").read_text(encoding="utf-8")

    assert "set -eu" in entrypoint
    assert entrypoint.index("alembic upgrade head") < entrypoint.index("exec granian")


def test_entrypoint_fails_closed_when_migration_fails(tmp_path: Path) -> None:
    binary_dir = tmp_path / "bin"
    binary_dir.mkdir()
    marker = tmp_path / "granian-called"

    alembic = binary_dir / "alembic"
    alembic.write_text("#!/bin/sh\nexit 17\n", encoding="utf-8")
    alembic.chmod(0o755)

    granian = binary_dir / "granian"
    granian.write_text('#!/bin/sh\n: > "$GRANIAN_MARKER"\n', encoding="utf-8")
    granian.chmod(0o755)

    environment = os.environ.copy()
    environment["PATH"] = f"{binary_dir}:{environment['PATH']}"
    environment["GRANIAN_MARKER"] = str(marker)
    result = subprocess.run(
        ["sh", str(BACKEND_ROOT / "entrypoint.sh")],
        cwd=BACKEND_ROOT,
        env=environment,
        capture_output=True,
        text=True,
        check=False,
    )

    assert result.returncode == 17
    assert not marker.exists()
