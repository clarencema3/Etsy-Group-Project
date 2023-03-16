import React from "react";
import { useModal } from "../../context/Modal";
import { NavLink } from 'react-router-dom';
import "./AddCartModal.css"

function AddCartModal({ product, quantity }) {
    const { closeModal } = useModal()

    const handleClick = () => {
        closeModal()
    }

    return (
        <div className="cart-modal-container">
            <div className="cart-modal-div">
                <div className="cart-modal-item">
                    <div className="cart-modal-img-div">
                        <img className="cart-modal-img" src={product.preview_img} alt="item image" />
                        <span className="cart-modal-check">✅</span>
                    </div>
                    <div className="cart-modal-text">
                        {quantity} {quantity > 1 ? "items added to cart" : "item added to cart"}
                    </div>
                </div>
                <NavLink to="/cart">
                    <button className="cart-modal-btn-cart" onClick={handleClick}>View cart & check out</button>
                </NavLink>
                <button className="cart-modal-btn-shop" onClick={handleClick}>Keep shopping <i className="fas fa-arrow-right" /></button>
            </div>
        </div>
    )
}

export default AddCartModal
