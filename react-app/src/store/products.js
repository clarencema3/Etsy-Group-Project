//actions
export const GET_ALL_PRODUCTS = "products/all"
export const GET_SINGLE_PRODUCT = "product"

//action creators
export const getProducts = (products) => {
    return {
        type: GET_ALL_PRODUCTS,
        products
    }
}

export const getSingleProduct = (product) => {
    return {
        type: GET_SINGLE_PRODUCT,
        product
    }
}

//thunks
export const fetchProducts = () => async(dispatch) => {
    const response = await fetch("/api/products/");

    if (response.ok) {
        const data = await response.json();
        let normalizedData = {}
        data.forEach(product => normalizedData[product.id] = product)
        dispatch(getProducts(normalizedData))
    }
}

export const fetchSingleProduct = (productId) => async(dispatch) => {
    const response = await fetch(`/api/products/${productId}`);

    if (response.ok) {
        const data = await response.json();
        dispatch(getSingleProduct(data))
    }
}


const initialState = {}

//reducer
const productsReducer = (state = initialState, action) => {
    let newState = {...state}
    switch(action.type) {
        case GET_ALL_PRODUCTS:
            newState['products'] = action.products
            return newState
        case GET_SINGLE_PRODUCT:
            newState['product'] = action.product
            return newState
        default:
            return state
    }
}

export default productsReducer;