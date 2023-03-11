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
    productDictionary = product.to_dict()
    productDictionary['user'] = product.user.to_dict()
    print('type of users ',type(product.user))
    print('type of reviews', type(product.reviews))
    return productDictionary


@products_routes.route("/new")
def create_new_product():
    
    pass