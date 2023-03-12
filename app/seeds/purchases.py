from app.models import db, Purchase, SCHEMA, environment
from sqlalchemy.sql import text


def seed_purchases():
    purchase1 = Purchase(
        user_id=1,
        product_id=1,
        quantity=10,
        order_id=1,
        total_price=99.99
    )

    db.session.add(
        purchase1
    )
    db.session.commit()


def undo_purchases():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.purchases RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM purchases")

    db.session.commit()
