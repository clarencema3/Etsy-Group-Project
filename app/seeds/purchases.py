from app.models import db, Purchase, SCHEMA, environment
from sqlalchemy.sql import text
from datetime import datetime


def seed_purchases():
    purchase1 = Purchase(
        user_id=1,
        product_id=1,
        quantity=10,
        order_id=1,
        total_price=99.99,
        date=datetime.now()
    )

    purchase2 = Purchase(
        user_id=1,
        product_id=2,
        quantity=3,
        order_id=2,
        total_price=59.77,
        date=datetime.now()
    )

    purchase3 = Purchase(
        user_id=1,
        product_id=5,
        quantity=3,
        order_id=2,
        total_price=145.00,
        date=datetime.now()
    )

    purchase4 = Purchase(
        user_id=2,
        product_id=5,
        quantity=3,
        order_id=3,
        total_price=145.00,
        date=datetime.now()
    )


    db.session.add_all(
        [purchase1, purchase2, purchase3, purchase4]
    )
    db.session.commit()


def undo_purchases():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.purchases RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM purchases")

    db.session.commit()
