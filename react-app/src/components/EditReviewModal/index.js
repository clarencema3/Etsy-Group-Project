import React, { useState, useEffect } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { editReview } from "../../store/reviews";
import { fetchSingleProduct } from "../../store/products";

const EditReviewModal = ({ reviews, user, productId }) => {
  const dispatch = useDispatch()
  const userId = user?.id;
  const currentReview = reviews.find((review) => review?.user_id === userId);
  const [rating, setRating] = useState(currentReview.rating);
  const [review, setReview] = useState(currentReview.review);
  const { closeModal } = useModal();


  const confirm = (e) => {
    e.preventDefault()
    
    currentReview.review = review
    currentReview.rating= rating

    dispatch(editReview(currentReview))
    dispatch(fetchSingleProduct(productId))
    closeModal()
  }


  return (
    <div className="edit__modal__container">
      <div className="edit__title__container">
        <p className="edit__title">Confirm edit</p>
      </div>
      <div className="edit__question__container">
        <p className="edit__question">
          Are you sure you want to edit this review?
        </p>
      </div>
      <form>
        <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
          ></textarea>
          <input
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          ></input>
      </form>
      <div className="edit__button__container">
        <button onClick={confirm} className="edit__button">
          Yes (edit Review)
        </button>
      </div>
      <div className="edit__button__container">
        <button onClick={closeModal} className="deny__button">
          No (Keep Review)
        </button>
      </div>
    </div>
  )
}

export default EditReviewModal
