from .db import db, SCHEMA, environment, add_prefix_for_prod


class Purchase(db.Model):
    __tablename__ = "purchases"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("products.id")), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    order_id = db.Column(db.Integer, nullable=False)
    total_price = db.Column(db.Float, nullable=False)
    date = db.Column(db.DateTime, nullable=False)

    # relationships
    user = db.relationship("User", back_populates="purchases")
    products = db.relationship("Product", back_populates="purchase")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'product_id': self.product_id,
            'quantity': self.quantity,
            'order_id': self.order_id,
            'total_price': self.total_price,
            'date': self.date
        }
