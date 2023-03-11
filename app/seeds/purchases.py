from app.models.purchase import db, Purchase
from sqlalchemy.sql import text


def seed_purchases():
    purchase1 = Purchase(
        user_id=1,
        product_id=1,
        quantity=10,
        order_id=1,
        price_at_purchase=99.99
    )

    db.session.add(
        purchase1
    )
    db.session.commit()


def undo_purchases():
    db.session.execute(text("DELETE FROM purchases"))
    db.session.commit()
