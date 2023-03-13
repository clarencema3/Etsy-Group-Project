from flask import Blueprint, jsonify, session, request
from app.models import User, db, Product, CartItem
from app.forms import ShoppingCartForm

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

@cart_routes.route('/', methods=["POST"])
def add_cart_item():
    res = request.get_json()
    form = ShoppingCartForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        cart_item = CartItem(
            user_id=res["user_id"],
            product_id=res["product_id"],
            quantity=res["quantity"],
        )
        db.session.add(cart_item)
        db.session.commit()
        return cart_item.to_dict()



@cart_routes.route('/<int:id>', methods=["DELETE"])
def delete_cart_item(id):
    pass
