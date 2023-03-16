import React from "react";
import OpenModalButton from "../OpenModalButton";
import CreateReviewModal from "../CreateReviewModal";
import DeleteReviewModal from "../DeleteReviewModal";
import EditReviewModal from "../EditReviewModal";
import './Reviews.css'

const Reviews = ({ product, user }) => {
  const reviews = product?.reviews
  console.log("reviews in reviews", reviews)
  const numberOfReviews = () => {
    if (reviews && reviews.length === 1) {
      return (
        <div>{reviews && reviews.length} review <i className="fas fa-star" /></div>
      )
    } else if (reviews && reviews.length < 1) {
      return (
        <div >
          Be the first to post a review!
        </div>
      )
    } else {
      return (
        <div>{reviews && reviews.length} reviews <i className="fas fa-star" /></div>
      )
    }
  }

  const compareRev = reviews?.find(review => review?.user_id === user?.id)

  const showReviews = () => {
    if (reviews?.length === 0) {
      return (
        <div></div>
      )
    } else {
      return reviews?.map((review) => {
        let rating
        if (review.rating === 1) {
          rating =
            <span className="reviewStarsContainer">
              <i className="fas fa-star" />
            </span>
        }
        if (review.rating === 2) {
          rating =
            <div className="reviewStarsContainer">
              <i className="fas fa-star" />
              <i className="fas fa-star" />
            </div>
        }
        if (review.rating === 3) {
          rating =
            <div className="reviewStarsContainer">
              <i className="fas fa-star" />
              <i className="fas fa-star" />
              <i className="fas fa-star" />
            </div>
        }
        if (review.rating === 4) {
          rating =
            <div className="reviewStarsContainer">
              <i className="fas fa-star" />
              <i className="fas fa-star" />
              <i className="fas fa-star" />
              <i className="fas fa-star" />
            </div>
        }
        if (review.rating === 5) {
          rating =
            <div className="reviewStarsContainer">
              <i className="fas fa-star" />
              <i className="fas fa-star" />
              <i className="fas fa-star" />
              <i className="fas fa-star" />
              <i className="fas fa-star" />
            </div>
        }

        const editReviewButton = () => {
          if (user?.id === review?.user_id)
            return (
              <>
                <OpenModalButton

                  buttonText="Edit"
                  modalClass="buyersProductEditButton"

                  modalComponent={
                    <EditReviewModal reviews={product.reviews} user={user} productId={product.id} />
                  } />
              </>
            )
        }
        const reviewDeleteButton = () => {
          if (user?.id === review?.user_id)
            return (
              <>
                <OpenModalButton
                  modalClass="buyersProductRemoveButton"
                  buttonText="Delete"
                  modalComponent={
                    <DeleteReviewModal reviews={product?.reviews} user={user} productId={product?.id} />
                  } />
              </>
            )
        }
        return (
          <>
            {rating}
            <div className="buyersReview">{review.review}</div>
            <div className="buyersLogoContainer">
              <img className="buyersImageLogo" src="https://www.pngfind.com/pngs/m/93-938050_png-file-transparent-white-user-icon-png-download.png" alt="logo" />
              <div className="buyersUserAndListingContainer">
                <strong className="buyersUsername">{review.owner_name}</strong>

                <div className="reviewEditAndDeleteButton">
                  {editReviewButton()}
                  {reviewDeleteButton()}

                </div>
              </div>
            </div>
          </>
        )
      })
    }
  }


  const reviewButton = () => {
    if (user && user?.id !== product?.user?.id && user.id !== compareRev?.user_id) {
      return (
        <div className="buyersPostReviewButton">
          <OpenModalButton
            buttonText={"Post Your Review!"}
            modalClass={"create-review"}
            modalComponent={
              <CreateReviewModal productId={product.id} user={user} />
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

      {reviewButton()}
      <div className="buyersContainer">
        <div>
          {/* {reviews?.map(review => (
            <>
              {showReviews()}
              <div>{review.review}</div>
              <div className="buyersLogoContainer">
                <img className="buyersImageLogo" src="https://i.etsystatic.com/25260451/r/il/402e7c/4387266595/il_794xN.4387266595_dh89.jpg" alt="logo" />
                <div className="buyersUserAndListingContainer">
                  <strong>{review.owner_name}</strong>
                </div>
              </div>
              {user.id === review.user_id ?
                <div> */}
          {/* <OpenModalButton
                    buttonText="Edit"
                    modalComponent={
                      <EditReviewModal reviews={product.reviews} user={user} productId={product.id} />
                    } /> */}
          {/* <OpenModalButton
                    buttonText="Delete"
                    modalComponent={
                      <DeleteReviewModal reviews={product.reviews} user={user} productId={product.id} />
                    } /> */}
          {/* {showReviews()}
                </div>
                : null}
              <div>
              </div>
            </>
          ))} */}
          {showReviews()}
        </div>
      </div>
    </div>
  )
}

export default Reviews
