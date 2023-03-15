from app.models import db, CartItem, SCHEMA, environment
from sqlalchemy.sql import text


def seed_cart_items():
    cartItem1 = CartItem(
        user_id=1,
        product_id=1,
        quantity=1
    )

    cartItem2 = CartItem(
        user_id=1,
        product_id=2,
        quantity=3
    )

    cartItem3 = CartItem(
        user_id=2,
        product_id=2,
        quantity=5
    )

    cartItem4 = CartItem(
        user_id=3,
        product_id=4,
        quantity=2
    )

    db.session.add_all([
        cartItem1,
        cartItem2,
        cartItem3,
        cartItem4
    ])

    db.session.commit()


def undo_cart_items():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.cart_items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM cart_items")

    db.session.commit()
