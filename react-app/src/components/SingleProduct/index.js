import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts, fetchSingleProduct } from "../../store/products";
import { useParams } from "react-router-dom";
import './SingleProduct.css'
import { clearState } from "../../store/products";
import { createCartItem } from "../../store/cart";

const SingleProduct = () => {
  const dispatch = useDispatch()
  const { productId } = useParams()
  const product = useSelector(state => state.products.product)
  const user = useSelector(state => state.session.user)
  const [quantity, setQuantity] = useState(0)

  const maxQuantity = [];
  for (let i = 1; i <= product?.stock; i++) {
    maxQuantity.push(i)
  }


  useEffect(() => {
    dispatch(fetchSingleProduct(productId))
    return () => dispatch(clearState())
  }, [dispatch, productId])

  const onChangeHandler = (e) => {
    setQuantity(e.target.value)
  }

  const addCartClick = async (e) => {
    e.preventDefault()


    const item_info = {
      user_id: user.id,
      product_id: product.id,
      quantity: Number(quantity)
    }

    const newCartItem = await dispatch(createCartItem(item_info))
  }


  if (!product) return <h1>loading</h1>

  return product && (

    <div className="page-container">
      <div className="product-div">
        <div className="product-image-div">
          <img src={product.preview_img} className='product-image'></img>
        </div>
        <div className="product-details-div">
          <div className="product-details">
            {product.stock <= 5 ? <strong className="low-stock">Only {product.stock} left</strong> : ""}
            <p>${product.price}</p>
            <strong className="product-label">Product Name:</strong>
            <p>{product.product_name}</p>
            <strong className="product-label">Product Description:</strong>
            <p>{product.description}</p>
          </div>
          <div className="product-seller-div">
            <p>Seller's Name: {product.user?.username}</p>
            <p>Rating</p>
            <p>Total Stock: {product.stock}</p>
            <p>Quantity</p>
            <select className="select-quantity" onChange={onChangeHandler}>
              <option>Select Quantity</option>
              {maxQuantity.map(number => (
                <option>{number}</option>
              )
              )}
            </select>
            <div className="button-div">
              <button className="buy-button">Buy it now</button>
              <button onClick={addCartClick} className="add-cart-button">Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
      <div className="reviews-div">
        <div className="reviews">
          render reviews component here

        </div>
      </div>
    </div>
  )
}

export default SingleProduct;
