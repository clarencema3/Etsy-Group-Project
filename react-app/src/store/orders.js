
export const CLEAR_STATE = "orders/CLEAR_STATE"
export const GET_ALL_ORDERS = "orders/GET_ALL_ORDERS";
export const ADD_PURCHASE = "orders/ADD_PURCHASE"

export const clearState = () => {
    return {
        type: CLEAR_STATE
    }
}

export const getOrders = (orders) => {
    return {
        type: GET_ALL_ORDERS,
        orders,
    };
};

export const addPurchase = (item) => {
    return {
        type: ADD_PURCHASE,
        item,
    }
}


export const fetchOrders = () => async (dispatch) => {
    const response = await fetch("/api/orders/");

    if (response.ok) {
        const details = await response.json();
        console.log(details)
        dispatch(getOrders(details))
    }
};

export const createOrder = (cartItems) => async (dispatch) => {

    //loops through each item in cart and hits POST api for each
    // for (let item of cartItems) {
        console.log("cartItems from inside THUNK", cartItems)
        const response = await fetch(`/api/orders/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cartItems),
        });


        if (response.ok) {
            const details = await response.json();
            dispatch(addPurchase(details));
            return details;
        }


    // }
}

const initialState = {};

//reducer
const ordersReducer = (state = initialState, action) => {
    let newState = { ...state }
    switch (action.type) {
        case GET_ALL_ORDERS:
            newState["purchases"] = { ...action.orders }
            return newState

        case ADD_PURCHASE:
            console.log("action from inside REDUCER", action)
            // newState["purchases"] = {...action.orders}
            return newState


        default:
            return state

    }

}

export default ordersReducer
