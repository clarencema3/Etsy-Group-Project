import React from "react";
import OpenModalButton from "../OpenModalButton";
import CreateReviewModal from "../CreateReviewModal";
import DeleteReviewModal from "../DeleteReviewModal";
import EditReviewModal from "../EditReviewModal";

const Reviews = ({ product, user }) => {
  const reviews = product?.reviews
  console.log("reviews from reviews", reviews)
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

  const compareRev = reviews?.find(review => review?.user_id === user?.id)



  const reviewButton = () => {
    if (user && user?.id !== product?.user?.id && user.id !== compareRev?.user_id) {
      return (
        <div>
          <OpenModalButton
            buttonText={"Post Your Review!"}
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
                    <EditReviewModal reviews={product.reviews} user={user} productId={product.id} />
                  } />
                <OpenModalButton
                  buttonText="Delete"
                  modalComponent={
                    <DeleteReviewModal reviews={product.reviews} user={user} productId={product.id} />
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
