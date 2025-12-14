from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_purchase_sweet(user_token):
    response = client.post(
        "/api/sweets/1/purchase",
        headers={"Authorization": f"Bearer {user_token}"}
    )
    assert response.status_code in [200, 400]


def test_purchase_out_of_stock(user_token):
    response = client.post(
        "/api/sweets/999/purchase",
        headers={"Authorization": f"Bearer {user_token}"}
    )
    assert response.status_code == 400
