import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSingleProduct } from "../../store/products";
import { useParams } from "react-router-dom";
import './SingleProduct.css'
import { clearState } from "../../store/products";

import OpenModalButton from "../OpenModalButton";
import { createCartItem, fetchCartItems } from "../../store/cart";

import Reviews from "../Reviews/reviews";
import AddCartModal from "../AddCartModal";


const SingleProduct = () => {
  const dispatch = useDispatch()
  const { productId } = useParams()
  const user = useSelector((state) => state.session.user)
  const product = useSelector(state => state.products.product)
  const cart = useSelector(state => state.cart.cart)
  const [quantity, setQuantity] = useState(0)


  const maxQuantity = [];
  for (let i = 1; i <= product?.stock; i++) {
    maxQuantity.push(i)
  }

  useEffect(() => {
    dispatch(fetchSingleProduct(productId))
    return () => dispatch(clearState())
  }, [dispatch, productId])

  if (!product) return <h1>loading</h1>

  const onChangeHandler = (e) => {
    setQuantity(e.target.value)
  }

  const addCartClick = async (e) => {
    e.preventDefault()

    if (quantity === "Select Quantity") {
      return
    }

    const item_info = {
      user_id: user.id,
      product_id: product.id,
      quantity: Number(quantity)
    }

    await dispatch(createCartItem(item_info))
    await dispatch(fetchCartItems())
  }

  // check if item is already in cart
  let cartItemList = []
  if (cart) {
    cartItemList = Object.values(cart)

  }

  const itemNotInCart = () => {
    for (let i = 0; i < cartItemList.length; i++) {
      if (cartItemList[i].product_id === product.id) {
        return false
      }
    }
    return true
  }

  // disable button and buttonText functions
  const disableBtn = () => {
    if (!user) {
      return true
    }
    return quantity > 0 && quantity !== "Select Quantity" && itemNotInCart() ? false : true
  }

  const btnText = () => {
    if (!user) {
      return "Please log in to add items cart"
    }
    if (user && !itemNotInCart()) {
      return "Item already in cart"
    } else {
      return "Add to cart"
    }

  }

  return product && (

    <div className="page-container">
      <div className="product-div white-space">
        <div className="product-image-div">
          <img src={product.preview_img} className='product-image' alt='product'></img>
        </div>
        <div className="product-details-div">
          <div className="product-details">
            {product.stock <= 5 ? <strong className="low-stock">Only {product.stock} left</strong> : ""}
            <p className="price-of-product">${Number(product.price).toFixed(2)}</p>
            <strong className="product-label">Product Name:</strong>
            <p>{product.product_name}</p>
            <strong className="product-label">Product Description:</strong>
            <p>{product.description}</p>
          </div>
          <div className="product-seller-div">
            <p>Seller's Name: {product.user?.username}</p>
            {/* <p>Rating</p> */}
            <p>Total Stock: {product.stock}</p>
            <p>Quantity</p>
            <select className="select-quantity" onChange={onChangeHandler}>
              <option>Select Quantity</option>
              {maxQuantity.map(number => (
                <option key={number}>{number}</option>
              )
              )}
            </select>
            <div className="button-div">
              <button className="buy-button">Buy it now (Feature coming soon!!)</button>
              <div className="add-cart-button-div" onClick={addCartClick}>
                <OpenModalButton
                  modalClass="add-cart-button"
                  buttonText={btnText()}
                  modalDisabled={disableBtn}
                  modalComponent={
                    <AddCartModal product={product} quantity={quantity} />
                  }
                />
              </div>

            </div>
          </div>
        </div>
      </div>
      <Reviews product={product} user={user} />
    </div>
  )
}

export default SingleProduct;
