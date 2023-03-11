from .db import db, SCHEMA, environment, add_prefix_for_prod


class CartItem(db.Model):
    __tablename__ = "cart_items"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    product_id = db.Column(db.Integer, db.ForeignKey(
        "products.id"), cascade="all, delete-orphan", nullable=False)
    quantity = db.Column(
        db.Integer, nullable=False)

    # relationships
    user = db.relationship("User", back_populates="cart_items")
    products = db.relationship("Product", back_populates="cart")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'product_id': self.product_id,
            'quantity': self.quantity
        }


