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
        cart_items_arr.append(item_dict)

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


@cart_routes.route('/', methods=["PUT"])
def edit_cart_item():
    res = request.get_json()
    # print("res \n\n\n\n\n\n", res)
    current_cart_item = CartItem.query.filter_by(
        product_id=res["product_id"], user_id=res["user_id"])
    if current_cart_item[0]:
        current_cart_item[0].quantity = res["quantity"]
        db.session.commit()

    return current_cart_item[0].to_dict()


@cart_routes.route('/', methods=["DELETE"])
def delete_cart_item():
    res = request.get_json()
    print("res to delete $$$$$$$$$$$$$$$$$$$$$$ \n\n\n\n",
          res)
    delete_cart_item = CartItem.query.filter_by(
        product_id=res["product_id"], user_id=res["user_id"])

    print("item to delete $$$$$$$$$$$$$$$$$$$$$$ \n\n\n\n",
          list(delete_cart_item))

    # return {"Response": f"Successfully deleted item."}
    if delete_cart_item:
        db.session.delete(delete_cart_item)
        db.session.commit()
        return {"Response": f"Successfully deleted item."}
