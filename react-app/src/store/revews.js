// import { fetchProducts } from "./products"

// export const GET_REVIEWS = "reviews/all"
// export const GET_SINGLE_REVIEW = "review"
export const CREATE_REVIEW = "review/new"
// export const UPDATE_REVIEW = "review/edit"
// export const DELETE_REVIEW = "review/delete"

// export const getReviews = (reviews) => {
//   return {
//     type: GET_REVIEWS,
//     reviews
//   }
// }
// export const getSingleReview = (review) => {
//   return {
//     type: GET_SINGLE_REVIEW,
//     review
//   }
// }

export const createReview = (review) => {
  return {
    type: CREATE_REVIEW,
    review
  }
}

// export const updateReview = (review) => {
//   return {
//     type: UPDATE_REVIEW,
//     review
//   }
// }

// export const deleteReview = (reviewId) => {
//   return {
//     type: DELETE_REVIEW,
//     reviewId
//   }
// }

export const postReview = (review) => async (dispatch) => {
  const response = await fetch('/api/reviews/', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(review)
  })
  if (response.ok) {
    const review = await response.json();
    const normalizedData = {}
    normalizedData[review.id] = review
    console.log('normalized data in thunk', normalizedData)
    dispatch(createReview(normalizedData))
  }
}

// export const fetchReviews = (id) => async (dispatch) => {
//   const response = await fetch(`/api/products/${id}`);

//   if (response.ok) {
//     const data = await response.json();
//     let normalizedData = {}
//     data.forEach((review) => (normalizedData[review.id] = review));
//     dispatch(getReviews(normalizedData));
//   }
// }

const initialState = {}

const reviewsReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case CREATE_REVIEW:
      console.log("new state in reducer", newState)
      console.log("action in reducer", action.review)
      newState.reviews = { ...state.reviews }
      newState.reviews['review'] = action.review
      return newState
    default:
      return state
  }
}

export default reviewsReducer
