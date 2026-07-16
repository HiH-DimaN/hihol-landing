"""Create the AI diagnostic leads table.

Revision ID: 20260716_0001
Revises: None
Create Date: 2026-07-16

"""
from collections.abc import Sequence

import sqlalchemy as sa

from alembic import op

revision: str = "20260716_0001"
down_revision: str | Sequence[str] | None = None
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.create_table(
        "leads",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("CURRENT_TIMESTAMP"),
            nullable=False,
        ),
        sa.Column("source", sa.String(length=64), nullable=False),
        sa.Column("service_context", sa.String(length=96), nullable=True),
        sa.Column("process", sa.Text(), nullable=False),
        sa.Column("desired_result", sa.Text(), nullable=False),
        sa.Column("frequency", sa.String(length=64), nullable=False),
        sa.Column("time_spent", sa.String(length=64), nullable=False),
        sa.Column("current_tools", sa.Text(), nullable=True),
        sa.Column("constraints", sa.Text(), nullable=True),
        sa.Column("budget", sa.String(length=64), nullable=False),
        sa.Column("name", sa.String(length=255), nullable=False),
        sa.Column("contact", sa.String(length=255), nullable=False),
        sa.Column("company", sa.String(length=255), nullable=True),
        sa.Column("consent_personal", sa.Boolean(), nullable=False),
    )
    op.create_index("ix_leads_created_at", "leads", ["created_at"], unique=False)


def downgrade() -> None:
    op.drop_index("ix_leads_created_at", table_name="leads")
    op.drop_table("leads")
