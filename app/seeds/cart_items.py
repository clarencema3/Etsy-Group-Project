from app.models import db, CartItem, SCHEMA, environment
from sqlalchemy.sql import text


def seed_cart_items():
    cartItem1 = CartItem(
        user_id=1,
        product_id=1,
        quantity=10
    )

    db.session.add(
        cartItem1
    )
    db.session.commit()


def undo_cart_items():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.cart_items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM cart_items")

    db.session.commit()
