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
    <div>
      {cartArr?.map((item) => (
        <div className="cart-item-parent-div">
          <div className="feature-img">
            <img className="cart-img" src={item.product.preview_img} alt="product img" />
          </div>
          <div className="product-name-and-img">
            <p>{item.product.product_name}</p>
            <p>{item.product.description}</p>
            <button onClick={e => deleteOnClickHandler(e, item)}>Remove</button>
          </div>
          <div className="quantity">
            <p>Quantity</p>
            <select onChange={e => onChangeHandler(e, item)}>
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
          <div className="price-and-stock">
            <div>
              ${parseFloat(item.product.price * item.quantity).toFixed(2)}
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
  );
}

export default Cart;
