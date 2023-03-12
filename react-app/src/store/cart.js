
//actions
export const GET_ALL_CART_ITEMS = "cart"


//action creators
export const getCartItems = (cartItems) => {
    return {
        type: GET_ALL_CART_ITEMS,
        cartItems,
    }
}


//thunks
export const fetchCartItems = () => async (dispatch) => {
  const response = await fetch("/api/cart/");

  if (response.ok) {
    const data = await response.json();
    let normalizedData = {};
    data.forEach((item) => (normalizedData[item.id] = item));
    dispatch(getCartItems(normalizedData));
  }
};

const initialState = {}

//reducer
const cartReducer = (state = initialState, action) => {
  let newState = { ...state}
  switch (action.type) {
    case GET_ALL_CART_ITEMS:
      newState["cart"] = action.cartItems
      return newState
    default:
      return state
  }
}

export default cartReducer
