from flask import Blueprint, jsonify, session, request
from app.models import User, db, Product, Review
from app.forms import LoginForm
from app.forms import SignUpForm
from app.forms import ProductForm
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
    productDictionary['reviews'] = [review.to_dict() for review in product.reviews]
    return productDictionary


@products_routes.route("/", methods=["POST"])
def create_new_product():
    res = request.get_json()
    print("res from inside POST ROUTE", res)
    form = ProductForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        product = Product(
            product_name=res["product_name"],
            description=res["description"],
            price=res["price"],
            seller_id=res["seller_id"],
            stock=res["stock"],
            preview_img=res["preview_img"]
        )
        db.session.add(product)
        db.session.commit()
        return product.to_dict()



@products_routes.route("/<int:id>", methods=["DELETE"])
def delete_a_product(id):
    product = Product.query.get(id)
    print('product in backend api route \n\n\n\n', product.to_dict())
    if product:
        db.session.delete(product)
        db.session.commit()
        return {"Response": f"Successfully deleted item."}


@products_routes.route("/<int:id>", methods=["PUT"])
def edit_a_product(id):
    product = Product.query.get(id)
    res = request.get_json()
    if product:
        product.product_name = res["product_name"]
        product.description = res["description"]
        product.price = res["price"]
        product.stock = res["stock"]
        product.preview_img = res["preview_img"]
        db.session.commit()
        return product.to_dict()
