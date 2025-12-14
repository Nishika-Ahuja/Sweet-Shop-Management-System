from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_admin_add_sweet(admin_token):
    response = client.post(
        "/api/sweets",
        headers={"Authorization": f"Bearer {admin_token}"},
        json={
            "name": "Rasgulla",
            "category": "Indian",
            "price": 25,
            "quantity": 20
        }
    )
    assert response.status_code in [200, 201]


def test_user_cannot_add_sweet(user_token):
    response = client.post(
        "/api/sweets",
        headers={"Authorization": f"Bearer {user_token}"},
        json={
            "name": "Barfi",
            "category": "Indian",
            "price": 30,
            "quantity": 10
        }
    )
    assert response.status_code == 403
