import React from "react";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { deleteReview } from "../../store/reviews";
import { fetchSingleProduct } from "../../store/products";
import './DeleteReview.css'


const DeleteReviewModal = ({ reviews, user, productId }) => {
  const userId = user?.id;
  const currentReview = reviews.find((review) => review?.user_id === userId);
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const confirm = (e) => {
    e.preventDefault();
    dispatch(deleteReview(currentReview?.id));
    dispatch(fetchSingleProduct(productId));
    closeModal();
  };

  return (
    <div className="delete-review-container">
      <h2>Confirm Delete</h2>
      <p className="delete__question">
        Are you sure you want to delete this review?
      </p>
      <button onClick={confirm} className="delete-review-button">
        Yes (Delete Review)
      </button>
      <button onClick={closeModal} className="keep-review-button">
        No (Keep Review)
      </button>
    </div>
  );
};

export default DeleteReviewModal;
