#!/bin/sh
set -eu

alembic upgrade head

exec granian --interface asgi app.main:app --host 0.0.0.0 --port 8000
