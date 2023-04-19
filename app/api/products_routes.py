from flask import Blueprint, jsonify, session, request
from app.models import User, db, Product, Review
from app.forms import LoginForm
from app.forms import SignUpForm
from app.forms import ProductForm
from app.forms import ImageForm
from flask_login import current_user, login_user, logout_user, login_required
from app.api.aws_helpers import get_unique_filename, upload_file_to_s3


products_routes = Blueprint('products', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages

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
    form = ProductForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        preview_img = form.data['preview_img']
        preview_img.filename = get_unique_filename(preview_img.filename)
        upload = upload_file_to_s3(preview_img)
        if "url" not in upload:
            errors['photo'] = 'Error in uploading your photo'
            return jsonify({ 'errors': errors }), 400
        product = Product(
            product_name=form.data["product_name"],
            description=form.data["description"],
            price=form.data["price"],
            seller_id=current_user.id,
            stock=form.data["stock"],
            preview_img=upload["url"]
        )
        db.session.add(product)
        db.session.commit()
        return product.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@products_routes.route("/<int:id>", methods=["DELETE"])
def delete_a_product(id):
    product = Product.query.get(id)

    if product:
        db.session.delete(product)
        db.session.commit()
        return {"Response": f"Successfully deleted item."}


@products_routes.route("/image/<int:id>", methods=["PUT"])
def edit_product_image(id):
    product = Product.query.get(id)
    form = ImageForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        preview_img = form.data['preview_img']
        preview_img.filename = get_unique_filename(preview_img.filename)
        upload = upload_file_to_s3(preview_img)
        if "url" not in upload:
            errors['preview_img'] = 'Error in uploading your photo'
            return jsonify({ 'errors': errors }), 400
        product.preview_img = upload["url"]
        db.session.commit()
        return product.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@products_routes.route("/<int:id>", methods=["PUT"])
def edit_a_product(id):
    product = Product.query.get(id)
    res = request.get_json()
    if product:
        product.product_name = res["product_name"]
        product.description = res["description"]
        product.price = res["price"]
        product.stock = res["stock"]
        db.session.commit()
        return product.to_dict()



