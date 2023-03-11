from app.models.cart_item import db, CartItem
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
    db.session.execute(text("DELETE FROM cart_items"))
    db.session.commit()
