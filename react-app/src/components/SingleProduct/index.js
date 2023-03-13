import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts, fetchSingleProduct } from "../../store/products";
import { useParams } from "react-router-dom";
import './SingleProduct.css'
import { clearState } from "../../store/products";

const SingleProduct = () => {
  const dispatch = useDispatch()
  const { productId } = useParams()
  const product = useSelector(state => state.products.product)
  const maxQuantity = [];
  for (let i = 1; i <= product?.stock; i++) {
    maxQuantity.push(i)
  }


  useEffect(() => {
    dispatch(fetchSingleProduct(productId))
    return () => dispatch(clearState())
  }, [dispatch, productId])

  if (!product) return <h1>loading</h1>

  const reviews = product?.reviews
  const numberOfReviews = () => {
    if (reviews && reviews.length === 1) {
      return (
        <div>{reviews && reviews.length} review <i className="fas fa-star" /></div>
      )
    } else if (reviews && reviews.length < 1) {
      return (
        <div>
          Be the first to post a review!
        </div>
      )
    } else {
      return (
        <div>{reviews && reviews.length} reviews <i className="fas fa-star" /></div>
      )
    }
  }

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
            <select className="select-quantity">
              <option>Select Quantity</option>
              {maxQuantity.map(number => (
                <option>{number}</option>
              )
              )}
            </select>
            <div className="button-div">
              <button className="buy-button">Buy it now</button>
              <button className="add-cart-button">Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
      <div className="reviewsContainer white-space">
        <div className="numberOfreviews">
          {numberOfReviews()}
        </div>
        <div className="buyersContainer">
          <div>
            {reviews?.map(review => (
              <>
                <div>{review.review}</div>
                <div className="buyersLogoContainer">
                  <img className="buyersImageLogo" src="https://i.etsystatic.com/25260451/r/il/402e7c/4387266595/il_794xN.4387266595_dh89.jpg" alt="logo" />
                  <div className="buyersUserAndListingContainer">
                    <strong>{product.user.username} {review.timestamp}</strong>

                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleProduct;
