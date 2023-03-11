from app.models.review import db, Review
from datetime import datetime
from sqlalchemy.sql import text


def seed_reviews():
    review1 = Review(
        user_id=1,
        product_id=1,
        rating=5,
        review="It was very good quality",
        timestamp=datetime.now()
    )
    review2 = Review(
        user_id=2,
        product_id=2,
        rating=3,
        review="It was w/e",
        timestamp=datetime.now()
    )
    review3 = Review(
        user_id=3,
        product_id=3,
        rating=1,
        review="Bad quality, stay away",
        timestamp=datetime.now()
    )

    db.session.add_all([
        review1,
        review2,
        review3,
    ])
    db.session.commit()


def undo_reviews():
    db.session.execute(text("DELETE FROM reviews"))
    db.session.commit()
