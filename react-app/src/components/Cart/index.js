import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { editCartItem, fetchCartItems, deleteCartItem } from "../../store/cart";
import "./Cart.css"

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cart);
  const user = useSelector((state) => state.session.user);


  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);


  if (!cartItems) return <h1>loading</h1>;
  console.log("cartItems from inside component", cartItems)

  let cartArr = Object.values(cartItems);

  function getQuantity(quantity) {

    const maxQuantity = [];
    for (let i = 1; i <= quantity; i++) {
      maxQuantity.push(i);
    }
    return maxQuantity
  }

  const onChangeHandler = async (e, item) => {
    // console.log("e from changeHanlder", e)
    // console.log("item from inside ChangeHandler", item)
    const item_info = {
      id: item.id,
      user_id: user.id,
      product_id: item.product_id,
      quantity: Number(e.target.value),
    };

    console.log("item_info", item_info)

    await dispatch(editCartItem(item_info))
  };

  const deleteOnClickHandler = async (e, item) => {
    e.preventDefault()
    const item_info = {
      id: item.id,
      user_id: user.id,
      product_id: item.product_id,
    };

    await dispatch(deleteCartItem(item_info))
  }

    return (
      <div className="center-container">
        {/* <div className="full-page-container"> */}
          <div className="items-in-cart">
            <h2>X Items in your cart</h2>
          </div>
          <div className="full-cart-container">
            <div className="cart-items-container">
              {cartArr?.map((item) => (
                <div className="single-cart-item-container">
                  <div className="feature-img">
                    <img
                      className="cart-img"
                      src={item.product.preview_img}
                      alt="product img"
                    />
                  </div>
                  <div className="item-info">
                    <h3>{item.product.product_name}</h3>
                    <button onClick={(e) => deleteOnClickHandler(e, item)}>
                      Remove
                    </button>
                  </div>
                  <div className="item-quantity">
                    <p>Quantity</p>
                    <select onChange={(e) => onChangeHandler(e, item)}>
                      {/* <option value={item.quantity}>{item.quantity} </option> */}
                      {getQuantity(item.product.stock).map((number) =>
                        item.quantity === number ? (
                          <option selected value={number}>
                            {number}{" "}
                          </option>
                        ) : (
                          <option value={number}>{number}</option>
                        )
                      )}
                    </select>
                  </div>
                  <div className="item-price">
                    <div>
                      $
                      {parseFloat(item.product.price * item.quantity).toFixed(
                        2
                      )}
                    </div>
                    {item.product.stock <= 5 ? (
                      <div>Only {item.product.stock} left - order soon!</div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-summary-container">
              <div className="cart-summary-box">
                <div className="payment-options">
                  <p>How you'll pay</p>
                  <div>
                    <input type="radio" value="Visa" name="paymentMethod" />{" "}
                    Visa
                  </div>
                  <div>
                    <input type="radio" value="PayPal" name="paymentMethod" />{" "}
                    PayPal
                  </div>
                  <div>
                    <input type="radio" value="Other" name="paymentMethod" />{" "}
                    Other
                  </div>
                </div>
                <div className="summary-line-item">
                  <p>Item(s) Total</p>
                  <p>$99.99</p>
                </div>
                <div className="summary-line-item">
                  <p>Shipping</p>
                  <p>Free</p>
                </div>
                <div className="summary-line-item">
                  <p>Total</p>
                  <p>$99.99</p>
                </div>
                <button className="checkout-button">Proceed to Checkout</button>
              </div>
            </div>
          </div>
        {/* </div> */}
      </div>
    );
}

export default Cart;
