
//actions
export const GET_ALL_CART_ITEMS = "cart"
export const ADD_CART_ITEM = "cart/ADD_ITEM"
export const EDIT_CART_ITEM = "cart/EDIT_CART_ITEM"
export const DELETE_CART_ITEM = "cart/DELETE_CART_ITEM"
export const CLEAR_CART_STATE = "cart/CLEAR_CART_STATE"


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

export const removeCartItem = (item_info) => {
  return {
    type: DELETE_CART_ITEM,
    item_info
  }
}

export const clearCartState = () => {
  return {
    type: CLEAR_CART_STATE
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

// delete cart item
export const deleteCartItem = (item_info) => async (dispatch) => {
  const response = await fetch("/api/cart/", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item_info),
  });

  if (response.ok) {
    const data = await response.json()
    dispatch(removeCartItem(item_info));
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
      newState.cart = { ...state.cart }
      newState.cart[action.cartItem.id].quantity = action.cartItem.quantity

      return newState

    case DELETE_CART_ITEM:
      newState.cart = { ...state.cart }
      delete newState.cart[action.item_info.id]
      return newState

    case CLEAR_CART_STATE:
      newState.cart = {}
      return newState

    default:
      return state
  }
}

export default cartReducer
