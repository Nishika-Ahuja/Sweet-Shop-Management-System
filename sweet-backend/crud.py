from sqlalchemy.orm import Session
import models, schemas
from auth import hash_password, verify_password

# Users
def create_user(db: Session, user: schemas.UserLogin, is_admin: int = 0):
    hashed_pw = hash_password(user.password)
    db_user = models.User(username=user.username, password=hashed_pw, is_admin=is_admin)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()

# Sweets
def create_sweet(db: Session, sweet: schemas.SweetCreate):
    db_sweet = models.Sweet(**sweet.dict())
    db.add(db_sweet)
    db.commit()
    db.refresh(db_sweet)
    return db_sweet

def get_sweets(db: Session):
    return db.query(models.Sweet).all()

def get_sweet_by_id(db: Session, sweet_id: int):
    return db.query(models.Sweet).filter(models.Sweet.id == sweet_id).first()

def update_sweet(db: Session, sweet_id: int, sweet: schemas.SweetCreate):
    db_sweet = get_sweet_by_id(db, sweet_id)
    if db_sweet:
        db_sweet.name = sweet.name
        db_sweet.category = sweet.category
        db_sweet.price = sweet.price
        db_sweet.quantity = sweet.quantity
        db.commit()
        db.refresh(db_sweet)
    return db_sweet

def delete_sweet(db: Session, sweet_id: int):
    db_sweet = get_sweet_by_id(db, sweet_id)
    if db_sweet:
        db.delete(db_sweet)
        db.commit()
    return db_sweet

def purchase_sweet(db: Session, sweet_id: int):
    db_sweet = get_sweet_by_id(db, sweet_id)
    if db_sweet and db_sweet.quantity > 0:
        db_sweet.quantity -= 1
        db.commit()
        db.refresh(db_sweet)
    return db_sweet

def search_sweets(db: Session, name=None, category=None, min_price=None, max_price=None):
    query = db.query(models.Sweet)
    if name: query = query.filter(models.Sweet.name.ilike(f"%{name}%"))
    if category: query = query.filter(models.Sweet.category.ilike(f"%{category}%"))
    if min_price is not None: query = query.filter(models.Sweet.price >= min_price)
    if max_price is not None: query = query.filter(models.Sweet.price <= max_price)
    return query.all()

def restock_sweet(db: Session, sweet_id: int, quantity: int):
    sweet = get_sweet_by_id(db, sweet_id)
    if sweet:
        sweet.quantity += quantity
        db.commit()
        db.refresh(sweet)
    return sweet

def purchase_sweet(db: Session, sweet_id: int, user_id: int):
    sweet = get_sweet_by_id(db, sweet_id)
    if not sweet or sweet.quantity <= 0:
        return None

    sweet.quantity -= 1

    purchase = models.Purchase(
        user_id=user_id,
        sweet_name=sweet.name,
        price=sweet.price
    )

    db.add(purchase)
    db.commit()
    db.refresh(sweet)

    return sweet


def get_user_purchases(db: Session, user_id: int):
    return db.query(models.Purchase)\
        .filter(models.Purchase.user_id == user_id)\
        .order_by(models.Purchase.created_at.desc())\
        .all()

def get_all_purchases(db: Session):
    return (
        db.query(
            models.User.username,
            models.Purchase.sweet_name,
            models.Purchase.price,
            models.Purchase.created_at
        )
        .join(models.User, models.User.id == models.Purchase.user_id)
        .order_by(models.Purchase.created_at.desc())
        .all()
    )
