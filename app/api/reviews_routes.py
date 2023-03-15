from flask import Blueprint, jsonify, session, request
from app.models import User, db, Product, Review
from app.forms import LoginForm
from app.forms import SignUpForm
from app.forms import ProductForm
from app.forms import ReviewForm
from flask_login import current_user, login_user, logout_user, login_required
from datetime import datetime

reviews_routes = Blueprint('reviews', __name__)

@reviews_routes.route("/", methods=["POST"])
def create_new_review():
    res = request.get_json()
    print("\n\n\n\n res from the backend",res)
    form = ReviewForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        review = Review(
          rating=res["rating"],
          review=res["review"],
          user_id=res["user_id"],
          product_id=res["product_id"],
          timestamp=datetime.now()
        )
        db.session.add(review)
        db.session.commit()
        return review.to_dict()


@reviews_routes.route("/<int:id>", methods=["DELETE"])
def delete_review(id):
    review = Review.query.get(id)
    if review:
        db.session.delete(review)
        db.session.commit()
        return {"Response": f"Successfully deleted item."}


@reviews_routes.route("/<int:id>", methods=["PUT"])
def edit_review(id):
    review = Review.query.get(id)
    print("review in the back end \n\n\n\n\n", review.to_dict())
    res = request.get_json()
    print('request from backend route \n\n\n\n\n' , res)
    if review:
       review.rating=res["rating"]
       review.review=res["review"]
       db.session.commit()
       return review.to_dict()