import React, { useState } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { postReview } from "../../store/revews";


const CreateReviewModal = ({ productId, user }) => {
  const dispatch = useDispatch()
  const [rating, setRating] = useState(0)
  const [review, setReview] = useState("")
  const handleSubmit = (e) => {
    e.preventDefault()

    const newReview = {
      'rating': rating,
      'review': review,
      'user_id': user.id,
      'product_id': productId
    }

    dispatch(postReview(newReview))
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea value={review} onChange={(e) => setReview(e.target.value)}>
        </textarea>
        <input value={rating} onChange={(e) => setRating(e.target.value)}>
        </input>
        <button type="submit">Post a review</button>
      </form>
    </div>
  )
}

export default CreateReviewModal
