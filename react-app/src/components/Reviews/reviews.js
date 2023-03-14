import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts, fetchSingleProduct } from "../../store/products";
import { useParams } from "react-router-dom";
import { clearState } from "../../store/products";
import OpenModalButton from "../OpenModalButton";
import { createCartItem } from "../../store/cart";

const Reviews = () => {
  const product = useSelector(state => state.products.product)
  const users = useSelector((state) => state.session.user)

  const reviews = product?.reviews

  const numberOfReviews = () => {
    if (reviews && reviews.length === 1) {
      return (
        <div>{reviews && reviews.length} review <i className="fas fa-star" /></div>
      )
    } else if (reviews && reviews.length < 1) {
      return (
        <div>
          Be the first to post a review!
        </div>
      )
    } else {
      return (
        <div>{reviews && reviews.length} reviews <i className="fas fa-star" /></div>
      )
    }
  }

  const compareRev = reviews?.find(review => review?.user_id === users?.id)
  console.log("compare review from review", compareRev)



  const reviewButton = () => {
    if (users && users?.id !== product?.user?.id && users.id !== compareRev?.user_id) {
      return (
        <div>
          <OpenModalButton
            buttonText={"Post Your Review!"}
            modalComponent={
              <div>
                Post your review!
              </div>
            }
          ></OpenModalButton>

        </div>
      )
    }
  }

  return (
    <div className="reviewsContainer white-space">
      <div className="numberOfreviews">
        {numberOfReviews()}
      </div>
      <br />
      {reviewButton()}
      <div className="buyersContainer">
        <div>
          {reviews?.map(review => (
            <>
              <div><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /></div>
              <div>{review.review}</div>
              <div className="buyersLogoContainer">
                <img className="buyersImageLogo" src="https://i.etsystatic.com/25260451/r/il/402e7c/4387266595/il_794xN.4387266595_dh89.jpg" alt="logo" />
                <div className="buyersUserAndListingContainer">
                  <strong>{review.owner_name}</strong>
                </div>
              </div>
              <div>
                <OpenModalButton
                  buttonText="Edit"
                  modalComponent={
                    <h1>Not yet functional Edit</h1>
                  } />
                <OpenModalButton
                  buttonText="Delete"
                  modalComponent={
                    <h1>Not yet functional Delete</h1>
                  } />
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Reviews
