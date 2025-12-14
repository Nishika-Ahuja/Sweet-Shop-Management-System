from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
import models, schemas, crud, auth
from database import engine, get_db, SessionLocal
from fastapi.middleware.cors import CORSMiddleware
from auth import get_current_user, admin_only
from datetime import datetime
from fastapi import status

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Sweet Shop Management System")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],  
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"],  
)

def create_admin():
    db = SessionLocal()
    admin_user = db.query(models.User).filter(models.User.username == "admin").first()
    if not admin_user:
        from auth import hash_password
        hashed_pw = hash_password("admin123")
        db.add(models.User(username="admin", password=hashed_pw, is_admin=1))
        db.commit()
        print("Admin created")
    db.close()

create_admin()

@app.post(
    "/api/auth/register",
    response_model=schemas.UserOut,
    status_code=status.HTTP_201_CREATED
)
def register(user: schemas.UserLogin, db: Session = Depends(get_db)):
    if crud.get_user_by_username(db, user.username):
        raise HTTPException(status_code=400, detail="Username already exists")
    return crud.create_user(db, user)



@app.post("/api/auth/login")
def login(user: schemas.UserLogin, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_username(db, user.username)
    if not db_user or not auth.verify_password(user.password, db_user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = auth.create_access_token({"sub": db_user.username})
    return {
        "access_token": token,
        "is_admin": db_user.is_admin  
    }

@app.get("/api/sweets", response_model=list[schemas.SweetOut])
def list_sweets(db: Session = Depends(get_db)):
    return crud.get_sweets(db)

@app.post("/api/sweets", response_model=schemas.SweetOut)
def add_sweet(
    sweet: schemas.SweetCreate,
    db: Session = Depends(get_db),
    admin=Depends(admin_only)
):
    return crud.create_sweet(db, sweet)


@app.put("/api/sweets/{sweet_id}", response_model=schemas.SweetOut)
def update_sweet(
    sweet_id: int,
    sweet: schemas.SweetCreate,
    db: Session = Depends(get_db),
    admin=Depends(admin_only)
):
    updated = crud.update_sweet(db, sweet_id, sweet)
    if not updated:
        raise HTTPException(status_code=404, detail="Sweet not found")
    return updated

@app.delete("/api/sweets/{sweet_id}")
def delete_sweet(sweet_id: int, db: Session = Depends(get_db), admin=Depends(admin_only)):
    deleted = crud.delete_sweet(db, sweet_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Sweet not found")
    return {"detail": "Sweet deleted successfully"}


@app.post("/api/sweets/{sweet_id}/purchase")
def purchase_sweet(
    sweet_id: int,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    purchased = crud.purchase_sweet(db, sweet_id, user.id)
    if not purchased:
        raise HTTPException(status_code=400, detail="Out of stock")
    return purchased


@app.get("/api/sweets/search", response_model=list[schemas.SweetOut])
def search_sweets(
    name: str | None = None,
    category: str | None = None,
    minPrice: float | None = None,
    maxPrice: float | None = None,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    return crud.search_sweets(
        db,
        name=name,
        category=category,
        min_price=minPrice,
        max_price=maxPrice
    )

@app.post("/api/sweets/{sweet_id}/restock", response_model=schemas.SweetOut)
def restock_sweet(
    sweet_id: int,
    data: schemas.RestockRequest,
    db: Session = Depends(get_db),
    admin=Depends(admin_only)
):
    sweet = crud.restock_sweet(db, sweet_id, data.quantity)
    if not sweet:
        raise HTTPException(status_code=404, detail="Sweet not found")
    return sweet


@app.get("/api/users/me/purchases", response_model=list[schemas.PurchaseOut])
def my_purchases(
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    return crud.get_user_purchases(db, user.id)

# @app.get(
#     "/api/admin/purchases",
#     response_model=list[schemas.PurchaseAdminOut]
# )
# def all_purchases(
#     db: Session = Depends(get_db),
#     admin=Depends(admin_only) 
# ):
#     return crud.get_all_purchases(db)
