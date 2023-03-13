import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts, fetchSingleProduct } from "../../store/products";
import { useParams } from "react-router-dom";
import './SingleProduct.css'

const SingleProduct = () => {
  const dispatch = useDispatch()
  const { productId } = useParams()
  const product = useSelector(state => state.products.product)
  const user = useSelector((state) => state.session.user)

  console.log('product from use selector', product)



  const maxQuantity = [];
  for (let i = 1; i <= product?.stock; i++) {
    maxQuantity.push(i)
  }


  useEffect(() => {
    dispatch(fetchSingleProduct(productId))
  }, [dispatch, productId])

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
            <p className="product-price">${product.price}</p>
            <strong className="product-label">Product Name:</strong>
            <p>{product.product_name}</p>
            <strong className="product-label">Product Description:</strong>
            <p>{product.description}</p>
          </div>
          <div className="product-seller-div">
            <p>Seller's Name: 
              <span>    {user.username}</span>
            </p>
            <p>Rating</p>
            <p>Total Stock: 
              <span>    {product.stock}</span>
            </p>
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
      <div className="reviews-div">
        <div className="reviews">
          render reviews component here

        </div>
      </div>
    </div>
  )
}

export default SingleProduct;
