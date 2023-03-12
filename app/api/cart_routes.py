from flask import Blueprint, jsonify, session, request
from app.models import User, db, Product, CartItem
from app.forms import LoginForm
from app.forms import SignUpForm
from app.forms import ProductForm
from flask_login import current_user, login_user, logout_user, login_required

cart_routes = Blueprint('cart', __name__)

@cart_routes.route('/')
def get_all_cart_items():
    user = current_user.to_dict()

    cart_items = CartItem.query.filter(CartItem.user_id == user["id"])

    cart_items_arr = []

    for item in list(cart_items):
        item_dict = item.to_dict()
        item_dict['product'] = item.products.to_dict()
        print("item_dict in for loop $$$$$$$$ \n\n\n\n", item_dict)
        cart_items_arr.append(item_dict)


    print("cart_items TEST \n\n\n\n", list(cart_items))
    return cart_items_arr
