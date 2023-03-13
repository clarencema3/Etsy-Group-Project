import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteProduct, fetchSellersProducts } from "../../store/products";

const DeleteProductModal = ({ id }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user)
  const { closeModal } = useModal()

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch(deleteProduct(id))
    dispatch(fetchSellersProducts(user.id))
    closeModal()
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to remove this product from the listings?</p>
        <button className="yes-please-delete" type="submit" onClick={handleSubmit}>Yes (Delete Product)</button>
        <button className="no-do-not-delete" type="submit" onClick={closeModal}>No (Keep Product)</button>
      </form>
    </div>
  )
}

export default DeleteProductModal
