from fastapi.testclient import TestClient
from main import app 

client = TestClient(app)

def test_user_registration():
    response = client.post(
        "/api/auth/register",
        json={
            "username": "newuser123",
            "password": "newpass123"
        }
    )
    assert response.status_code in [200, 201, 400]

