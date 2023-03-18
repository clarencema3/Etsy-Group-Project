from app.models import db, Review, SCHEMA, environment
from datetime import datetime
from sqlalchemy.sql import text


def seed_reviews():
    review1 = Review(
        user_id=3,
        product_id=1,
        rating=5,
        review="It was very good quality",
        timestamp=datetime.now()
    )
    review2 = Review(
        user_id=4,
        product_id=1,
        rating=3,
        review="It was w/e",
        timestamp=datetime.now()
    )
    review3 = Review(
        user_id=3,
        product_id=2,
        rating=1,
        review="Bad quality, stay away",
        timestamp=datetime.now()
    )
    review4 = Review(
        user_id=4,
        product_id=2,
        rating=3,
        review="It was w/e",
        timestamp=datetime.now()
    )

    # ---------------
    review5 = Review(
        user_id=3,
        product_id=3,
        rating=1,
        review="Bad quality, stay away",
        timestamp=datetime.now()
    )
    review6 = Review(
        user_id=4,
        product_id=3,
        rating=3,
        review="It was w/e",
        timestamp=datetime.now()
    )
    review7 = Review(
        user_id=3,
        product_id=4,
        rating=1,
        review="Bad quality, stay away",
        timestamp=datetime.now()
    )

    db.session.add_all([
        review1,
        review2,
        review3,
        review4,
        review5,
        review6,
        review7,
    ])
    db.session.commit()


def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM reviews")

    db.session.commit()
