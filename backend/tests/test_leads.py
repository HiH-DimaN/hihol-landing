from .conftest import valid_payload


async def test_health(client):
    resp = await client.get("/health")
    assert resp.status_code == 200
    assert resp.json()["status"] == "ok"


async def test_valid_lead(client):
    resp = await client.post("/leads", json=valid_payload())
    assert resp.status_code == 200
    body = resp.json()
    assert body["ok"] is True
    assert body["id"] > 0


async def test_consent_required(client):
    resp = await client.post("/leads", json=valid_payload(consent_personal=False))
    assert resp.status_code == 422


async def test_missing_name_rejected(client):
    resp = await client.post("/leads", json=valid_payload(name=""))
    assert resp.status_code == 422


async def test_honeypot_not_stored(client):
    resp = await client.post("/leads", json=valid_payload(website="http://spam.tld"))
    assert resp.status_code == 200
    # Honeypot hit returns a fake success with id 0 and stores nothing.
    assert resp.json()["id"] == 0


async def test_rate_limit(client):
    last = None
    for _ in range(7):
        last = await client.post("/leads", json=valid_payload())
    assert last.status_code == 429
