from .db import db, SCHEMA, environment, add_prefix_for_prod


class Review(db.Model):
    __tablename__ = "reviews"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("products.id")), nullable=False)

    rating = db.Column(db.Integer, nullable=False)
    review = db.Column(db.String(1000), nullable=False)
    timestamp = db.Column(db.DateTime, nullable=False)

    # relationships
    user = db.relationship("User", back_populates="reviews")
    product = db.relationship("Product", back_populates="reviews")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'product_id': self.product_id,
            'owner_name': self.user.username,
            'rating': self.rating,
            'review': self.review,
            'timestamp': self.timestamp,
        }
