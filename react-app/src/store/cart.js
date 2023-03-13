
//actions
export const GET_ALL_CART_ITEMS = "cart"
export const ADD_CART_ITEM = "cart/ADD_ITEM"
export const EDIT_CART_ITEM = "cart/EDIT_CART_ITEM"


//action creators
export const getCartItems = (cartItems) => {
  return {
    type: GET_ALL_CART_ITEMS,
    cartItems,
  }
}

export const addCartItem = (cartItem) => {
  return {
    type: ADD_CART_ITEM,
    cartItem,
  }
}

export const updateCartItem = (cartItem) => {
  return {
    type: EDIT_CART_ITEM,
    cartItem,
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

// create cart item
export const createCartItem = (item_info) => async (dispatch) => {
  const response = await fetch("/api/cart/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item_info)
  })

  if (response.ok) {
    let details = await response.json()
    dispatch(addCartItem(details))
    return details
  }
}

// edit cart item
export const editCartItem = (item_info) => async (dispatch) => {
  const response = await fetch("/api/cart/", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item_info),
  });

  if (response.ok) {
    let details = await response.json();
    dispatch(updateCartItem(details));
    return details;
  }
}

const initialState = {}

//reducer
const cartReducer = (state = initialState, action) => {
  let newState = { ...state }
  switch (action.type) {
    case GET_ALL_CART_ITEMS:
      newState["cart"] = action.cartItems
      return newState

    case ADD_CART_ITEM:
      // Note: update later as needed
      return newState

    case EDIT_CART_ITEM:
      console.log("action from inside REDUCER", action)
      console.log("newState from inside REDUCER", newState)
      newState.cart = { ...state.cart }
      newState.cart[action.cartItem.product_id].quantity = action.cartItem.quantity

      return newState

    default:
      return state
  }
}

export default cartReducer
