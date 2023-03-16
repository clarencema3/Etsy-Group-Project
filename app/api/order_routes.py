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

    res = request.get_json()

    # GET most recent order number to increment by 1
    recent_order = Purchase.query.order_by(Purchase.order_id.desc()).first()
    r_order = recent_order.to_dict()
    for item in res:
        purchase = Purchase(
            user_id = item["user_id"],
            product_id=item["product_id"],
            order_id=r_order["order_id"]+1,
            quantity=item["quantity"],
            total_price=item["quantity"]*item["product"]["price"],
            date=datetime.now(),
        )

        db.session.add(purchase)
        db.session.commit()

    return purchase.to_dict()
