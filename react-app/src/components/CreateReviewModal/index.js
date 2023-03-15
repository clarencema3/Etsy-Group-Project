import React, { useState, useEffect } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { postReview } from "../../store/reviews";
import { fetchSingleProduct } from "../../store/products";
import './CreateReview.css'

const CreateReviewModal = ({ productId, user }) => {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newReview = {
      rating: rating,
      review: review,
      user_id: user.id,
      product_id: productId,
    };

    await dispatch(postReview(newReview));
    dispatch(fetchSingleProduct(productId));
    closeModal();
  };

  return (
      <form className="review-form">
        <h2>Post your review!</h2>
        <div className="review-text-div">
          <textarea
            className="review-input-text"
            placeholder="Leave your review here..."
            rows='10'
            cols='35'
            value={review}
            onChange={(e) => setReview(e.target.value)}
          ></textarea>
        </div>
        <div className="star__container">
          <div className="rate">
              <input type="radio" id="star5" name="rate" value={rating} onClick={() => handleClick(5)}/>
              <label htmlFor="star5" title="text">5 stars</label>
              <input type="radio" id="star4" name="rate" value={rating} onClick={() => handleClick(4)}/>
              <label htmlFor="star4" title="text">4 stars</label>
              <input type="radio" id="star3" name="rate" value={rating} onClick={() => handleClick(3)}/>
              <label htmlFor="star3" title="text">3 stars</label>
              <input type="radio" id="star2" name="rate" value={rating} onClick={() => handleClick(2)}/>
              <label htmlFor="star2" title="text">2 stars</label>
              <input type="radio" id="star1" name="rate" value={rating} onClick={() => handleClick(1)}/>
              <label htmlFor="star1" title="text">1 star</label>
          </div>
        </div>
          <button className="submit-form-btn" onClick={handleSubmit} disabled={errors.length ? true : false}>
            Post a review
          </button>
      </form>
  );
};

export default CreateReviewModal;
