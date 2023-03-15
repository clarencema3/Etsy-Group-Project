from flask import Blueprint, jsonify, session, request
from app.models import Purchase, User, db
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

@order_routes.route("/", methods=["POST"])
def create_new_order():
    # user = current_user.to_dict()
    # print("user from inside ORDER POST ROUTE \n\n\n\n", user)
    res = request.get_json()
    print("res from inside POST ORDER ROUTE\n\n\n\n\n", res)

    purchase = Purchase(
        user_id = res["user_id"],
        product_id=res["product_id"],
        order_id=res["id"],
        quantity=res["quantity"],
        total_price=0,
        date=datetime.now(),
    )

    print("purchase created on backend???\n\n\n\n", purchase.to_dict())
    db.session.add(purchase)
    db.session.commit()

    return purchase.to_dict()
