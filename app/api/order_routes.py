from flask import Blueprint, jsonify, session, request
from app.models import Purchase, User
from flask_login import current_user
from datetime import datetime

order_routes = Blueprint('orders', __name__)


@order_routes.route("/")
def get_all_orders():
    user = current_user.to_dict()

    data = Purchase.query.filter(Purchase.user_id == user["id"])
    purchases = {}

    for purchase in list(data):
        purchase_dict = purchase.to_dict()
        purchase_dict["product"] = purchase.products.to_dict()

        seller_info = User.query.get(purchase_dict["product"]["seller_id"])
        purchase_dict["seller"] = seller_info.to_dict()

        if purchase_dict["order_id"] in purchases:
            purchases[purchase_dict["order_id"]].append(purchase_dict)
        else:
            purchases[purchase_dict["order_id"]] = [purchase_dict]

    return purchases
