import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts, fetchSingleProduct } from "../../store/products";
import { useParams } from "react-router-dom";
import './SingleProduct.css'
import { clearState } from "../../store/products";
import OpenModalButton from "../OpenModalButton";
import { createCartItem } from "../../store/cart";
import Reviews from "../Reviews/reviews";


const SingleProduct = () => {
  const dispatch = useDispatch()
  const { productId } = useParams()
  const user = useSelector((state) => state.session.user)
  const product = useSelector(state => state.products.product)
  // const user = useSelector(state => state.session.user)
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

  // const reviews = product?.reviews
  // const numberOfReviews = () => {
  //   if (reviews && reviews.length === 1) {
  //     return (
  //       <div>{reviews && reviews.length} review <i className="fas fa-star" /></div>
  //     )
  //   } else if (reviews && reviews.length < 1) {
  //     return (
  //       <div>
  //         Be the first to post a review!
  //       </div>
  //     )
  //   } else {
  //     return (
  //       <div>{reviews && reviews.length} reviews <i className="fas fa-star" /></div>
  //     )
  //   }
  // }

  // const compareRev = reviews?.find(review => review?.user_id === user?.id)

  // const reviewButton = () => {
  //   if (user && user?.id !== product?.user?.id && user.id !== compareRev?.user_id) {
  //     return (
  //       <div>
  //         <OpenModalButton
  //           buttonText={"Post Your Review!"}
  //           modalComponent={
  //             <div>
  //               Post your review!
  //             </div>
  //           }
  //         ></OpenModalButton>

  //       </div>
  //     )
  //   }
  // }

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
      <Reviews />
      {/* <div className="reviewsContainer white-space">
        <div className="numberOfreviews">
          {numberOfReviews()}
        </div>
        <br />
        {reviewButton()}
        <div className="buyersContainer">
          <div>
            {reviews?.map(review => (
              <>
                <div><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /></div>
                <div>{review.review}</div>
                <div className="buyersLogoContainer">
                  <img className="buyersImageLogo" src="https://i.etsystatic.com/25260451/r/il/402e7c/4387266595/il_794xN.4387266595_dh89.jpg" alt="logo" />
                  <div className="buyersUserAndListingContainer">
                    <strong>{product.user.username} {review.timestamp}</strong>
                  </div>
                </div>
                <div>
                  <OpenModalButton
                    buttonText="Edit"
                    modalComponent={
                      <h1>Not yet functional Edit</h1>
                    } />
                  <OpenModalButton
                    buttonText="Delete"
                    modalComponent={
                      <h1>Not yet functional Delete</h1>
                    } />
                </div>
              </>
            ))}
          </div>
        </div>
      </div> */}
    </div>
  )
}

export default SingleProduct;
