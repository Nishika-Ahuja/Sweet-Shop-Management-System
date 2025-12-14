from pydantic import BaseModel
from datetime import datetime

class UserLogin(BaseModel):
    username: str
    password: str

class UserOut(BaseModel):
    id: int
    username: str
    is_admin: int

    class Config:
        orm_mode = True

class SweetCreate(BaseModel):
    name: str
    category: str
    price: float
    quantity: int

class SweetOut(BaseModel):
    id: int
    name: str
    category: str
    price: float
    quantity: int

    class Config:
        orm_mode = True

class RestockRequest(BaseModel):
    quantity: int

class PurchaseOut(BaseModel):
    sweet_name: str
    price: float
    created_at: datetime

    class Config:
        orm_mode = True

class PurchaseAdminOut(BaseModel):
    username: str
    sweet_name: str
    price: float
    created_at: datetime

    class Config:
        orm_mode = True
