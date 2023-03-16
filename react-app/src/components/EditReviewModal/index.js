import React, { useState, useEffect } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { editReview } from "../../store/reviews";
import { fetchSingleProduct } from "../../store/products";
import './EditReview.css'

const EditReviewModal = ({ reviews, user, productId }) => {
  const dispatch = useDispatch()
  const userId = user?.id;
  const currentReview = reviews.find((review) => review?.user_id === userId);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState(currentReview?.review);
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();


  useEffect(() => {
    const errors = [];
    if (review.length < 1) errors.push('Review is required')
    if (rating < 1) errors.push('Star rating is required')
    setErrors(errors);
  }, [rating, review])

  const handleClick = (value) => {
    setRating(value)
  }
  const confirm = async (e) => {
    e.preventDefault()

    currentReview.review = review
    currentReview.rating = rating

    await dispatch(editReview(currentReview))
    dispatch(fetchSingleProduct(productId))
    closeModal()
  }


  return (
    <form className="review-form">
      <h2>Edit your review</h2>
      <p>Are you sure you want to edit this review?</p>
      <div className="review-text-div">
        <textarea
          className="review-input-text"
          rows='10'
          cols='35'
          value={review}
          onChange={(e) => setReview(e.target.value)}
        ></textarea>
      </div>
      <div className="star__container">
        <div className="rate">
          <input type="radio" id="star5" name="rate" value={rating} onClick={() => handleClick(5)} />
          <label htmlFor="star5" title="text">5 stars</label>
          <input type="radio" id="star4" name="rate" value={rating} onClick={() => handleClick(4)} />
          <label htmlFor="star4" title="text">4 stars</label>
          <input type="radio" id="star3" name="rate" value={rating} onClick={() => handleClick(3)} />
          <label htmlFor="star3" title="text">3 stars</label>
          <input type="radio" id="star2" name="rate" value={rating} onClick={() => handleClick(2)} />
          <label htmlFor="star2" title="text">2 stars</label>
          <input type="radio" id="star1" name="rate" value={rating} onClick={() => handleClick(1)} />
          <label htmlFor="star1" title="text">1 star</label>
        </div>
      </div>
      <button className={errors.length ? 'edit-review-btn disabled-button' : 'edit-review-btn enabled-button'} onClick={confirm} disabled={errors.length ? true : false}>
        Yes (Edit Review)
      </button>
      <button className="keep-review-btn" onClick={closeModal}>
        No (Keep Review)
      </button>
    </form>
  )
}

export default EditReviewModal
