import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { fetchCartItems } from "../../store/cart";

const Cart = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.cart);
    const user = useSelector((state) => state.session.user);

    useEffect(() => {
        dispatch(fetchCartItems());
    }, [dispatch]);

    if (!cartItems) return <h1>loading</h1>;
    console.log("cartItems from inside component", cartItems)




    return (
        <div>
            <h1>{cartItems[1].product.description}</h1>
        </div>
    )
}

export default Cart;
