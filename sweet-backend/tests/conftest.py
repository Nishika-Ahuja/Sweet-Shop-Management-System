import sys
import os
import pytest
from fastapi.testclient import TestClient

# backend root path add
sys.path.append(os.path.dirname(os.path.dirname(__file__)))

from main import app

client = TestClient(app)

@pytest.fixture
def user_token():
    # register user
    client.post(
        "/api/auth/register",
        json={"username": "user1", "password": "user123"}
    )

    # login user
    response = client.post(
        "/api/auth/login",
        json={"username": "user1", "password": "user123"}
    )
    return response.json()["access_token"]


@pytest.fixture
def admin_token():
    # login default admin
    response = client.post(
        "/api/auth/login",
        json={"username": "admin", "password": "admin123"}
    )
    return response.json()["access_token"]
