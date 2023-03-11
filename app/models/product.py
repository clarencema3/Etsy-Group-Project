from .db import db, SCHEMA, environment, add_prefix_for_prod


class Product(db.Model):
    __tablename__ = "products"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    product_name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(1000), nullable=False)
    price = db.Column(db.Float, nullable=False)
    seller_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    stock = db.Column(db.Integer, nullable=False)
    preview_img = db.Column(db.String(1000), nullable=False)

    # relationships
    cart = db.relationship("CartItem", back_populates="products", cascade="all, delete-orphan")
    reviews = db.relationship("Review", back_populates="product")
    purchase = db.relationship("Purchase", back_populates="products")
    user = db.relationship("User", back_populates="products")

    def to_dict(self):
        return {
            'id': self.id,
            'product_name': self.product_name,
            'description': self.description,
            'price': self.price,
            'seller_id': self.seller_id,
            'stock': self.stock,
            'preview_img': self.preview_img,
        }
