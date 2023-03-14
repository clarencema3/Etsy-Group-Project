import React, { useState } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { postReview } from "../../store/revews";
import { fetchSingleProduct } from "../../store/products";

const CreateReviewModal = ({ productId, user }) => {
  const dispatch = useDispatch()
  const [rating, setRating] = useState(0)
  const [review, setReview] = useState("")
  const { closeModal } = useModal();


  const handleSubmit = async (e) => {
    e.preventDefault()

    const newReview = {
      'rating': rating,
      'review': review,
      'user_id': user.id,
      'product_id': productId
    }

    await dispatch(postReview(newReview))
    dispatch(fetchSingleProduct(productId))
    closeModal()
  }



  return (
    <div>
      <form>
        <textarea value={review} onChange={(e) => setReview(e.target.value)}>
        </textarea>
        <input value={rating} onChange={(e) => setRating(e.target.value)}>
        </input>
        <button type="submit" onClick={handleSubmit}>Post a review</button>
      </form>
    </div>
  )
}

export default CreateReviewModal
