from flask import Blueprint, jsonify, session, request
from app.models import User, db, Product
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required

products_routes = Blueprint('products', __name__)


@products_routes.route('/')
def get_all_products():
    products = Product.query.all()
    return [product.to_dict() for product in products]

    
@products_routes.route("/<int:id>")
def get_single_product(id):
    product = Product.query.get(id)
    print("product", product)
    print("product.to_dict()", product.to_dict())
    return product.to_dict()
