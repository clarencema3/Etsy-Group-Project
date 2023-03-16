import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteProduct } from "../../store/products";


const DeleteProductModal = ({ id }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal()

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(deleteProduct(+id))
    closeModal()
  }
  return (
    <div className="delete-product_and_review-container">
      <h2>Confirm Delete</h2>
      <p className="delete-question">
        Are you sure you want to remove this product from the listings?
      </p>
      <button onClick={handleSubmit} className="delete-product_and_review-button">
        Yes (Delete Product)
      </button>
      <button onClick={closeModal} className="keep-product_and_review-button">
        No (Keep Product)
      </button>
    </div>
  )
}

export default DeleteProductModal
