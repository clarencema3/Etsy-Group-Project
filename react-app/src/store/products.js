// import { csrfFetch } from "./csrf";

//actions
export const GET_ALL_PRODUCTS = "products/all";
export const GET_SINGLE_PRODUCT = "product";
export const ADD_PRODUCT = "products/new";
export const DELETE_PRODUCT = "product/delete";
export const EDIT_PRODUCT = "product/edit";
export const GET_SELLER_PRODUCTS = "products/current"
export const CLEAR_STATE = "products/clear"
//action creators
export const clearState = () => {
  return {
    type: CLEAR_STATE
  }
}

export const getProducts = (products) => {
  return {
    type: GET_ALL_PRODUCTS,
    products,
  };
};

export const getSingleProduct = (product) => {
  return {
    type: GET_SINGLE_PRODUCT,
    product,
  };
};

export const getSellerProducts = (sellerProducts) => {
  return {
    type: GET_SELLER_PRODUCTS,
    sellerProducts
  }
}

export const addProduct = (product) => ({
  type: ADD_PRODUCT,
  product,
});

export const removeProduct = (productId) => {
  return {
    type: DELETE_PRODUCT,
    productId,
  };
};

export const updateProduct = (product) => {
  return {
    type: EDIT_PRODUCT,
    product,
  };
};

//thunks
export const fetchProducts = () => async (dispatch) => {
  const response = await fetch("/api/products/");

  if (response.ok) {
    const data = await response.json();
    let normalizedData = {};
    data.forEach((product) => (normalizedData[product.id] = product));
    dispatch(getProducts(normalizedData));
  }
};

export const fetchSingleProduct = (productId) => async (dispatch) => {
  const response = await fetch(`/api/products/${productId}`);

  if (response.ok) {
    const data = await response.json();
    dispatch(getSingleProduct(data));
  }
};

export const fetchSellersProducts = (userId) => async (dispatch) => {
  const response = await fetch("/api/products/");

  if (response.ok) {
    let data = await response.json();
    let normalizedData = {};
    data = data.filter(productItem => {
      return productItem.seller_id === userId
    })
    data.forEach((product) => (normalizedData[product.id] = product));
    dispatch(getSellerProducts(normalizedData));
  }
}

export const addNewProduct = (newProduct) => async (dispatch) => {
  const response = await fetch(`/api/products/`, {
    method: "POST",
    body: newProduct
  });

  if (response.ok) {
    const details = await response.json();
    dispatch(addProduct(details));
    return null
  } else if (response.status < 500) {
      const data = await response.json();
      if (data.errors) {
          return data.errors;
      }
  } else {
      return ["An error occurred. Please try again."];
  }
};

export const deleteProduct = (productId) => async (dispatch) => {
  const response = await fetch(`/api/products/${productId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(removeProduct(productId));
  }
};

export const editProduct = (product) => async (dispatch) => {
  const response = await fetch(`/api/products/${product.id}`, {
    method: "put",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
  if (response.ok) {
    const product = await response.json();
    dispatch(updateProduct(product));
  }
};

//aws image edit thunk -- don't set content type
export const updatePhoto = (productId, image) => async (dispatch) => {
  const response = await fetch(`/api/products/image/${productId}`, {
      method: "PUT",
      body: image
  })

  if (response.ok) {
      const product = await response.json()
      dispatch(updateProduct(product))
  }
}

const initialState = {};

//reducer
const productsReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case CLEAR_STATE:
      newState.product = {}
      return newState
    case DELETE_PRODUCT:
      newState.sellerProducts = {...state.sellerProducts}
      delete newState.sellerProducts[action.productId]
      return newState;
    case EDIT_PRODUCT:
      newState.sellerProducts = { ...state.sellerProducts }
      newState.sellerProducts[action.product.id] = action.product
      return newState;
    case GET_ALL_PRODUCTS:
      newState["products"] = action.products;
      return newState;
    case GET_SINGLE_PRODUCT:
      newState["product"] = action.product;
      return newState;
    case GET_SELLER_PRODUCTS:
      newState["sellerProducts"] = action.sellerProducts;
      return newState;
    case ADD_PRODUCT:
      newState["product"] = action.product;
      return newState;
    default:
      return state;
  }
};

export default productsReducer;
