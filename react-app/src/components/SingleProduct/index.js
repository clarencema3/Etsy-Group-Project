import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts, fetchSingleProduct } from "../../store/products";
import { useParams } from "react-router-dom";
import './SingleProduct.css'

const SingleProduct = () => {
    const dispatch = useDispatch()
    const { productId } = useParams()
    const product = useSelector(state => state.products.product)

    console.log('product from use selector', product)
    

    useEffect(() => {
      dispatch(fetchSingleProduct(productId))
    }, [dispatch, productId])

    if (!product) return <h1>loading</h1>

    return (
        <div className="product-container">
          <div className="product-image-div">
            <img src={product.preview_img} className='product-image'></img>
          </div>
          <div className="product-details-div">
            <div className="product-details">
              <p>${product.price}</p>
              <p className="product-label">Product Name:</p>
              <p>{product.product_name}</p>
              <p className="product-label">Product Description:</p>
              <p>{product.description}</p>
            </div>
            <div className="product-seller-div">
              <p>Seller's Name:</p>
              <p>{product.user.username}</p>
            </div>
          </div>
        </div>
    )
}

export default SingleProduct;
