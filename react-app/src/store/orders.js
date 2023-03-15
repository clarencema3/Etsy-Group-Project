
export const CLEAR_STATE = "orders/CLEAR_STATE"
export const GET_ALL_ORDERS = "orders/GET_ALL_ORDERS";

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


export const fetchOrders = () => async (dispatch) => {
    const response = await fetch("/api/orders/");

    if (response.ok) {
        const details = await response.json();
        console.log(details)
        dispatch(getOrders(details))
    }
};

const initialState = {};

//reducer
const ordersReducer = (state = initialState, action) => {
    let newState = { ...state }
    switch (action.type) {
        case GET_ALL_ORDERS:
            newState["purchases"] = { ...action.orders }
            return newState

        default:
            return state

    }

}

export default ordersReducer
