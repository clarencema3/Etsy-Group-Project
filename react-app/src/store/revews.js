// import { fetchProducts } from "./products"

// export const GET_REVIEWS = "reviews/all"
// export const GET_SINGLE_REVIEW = "review"
// export const CREATE_REVIEW = "review/new"
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

// export const createReview = (review) => {
//   return {
//     type: CREATE_REVIEW,
//     review
//   }
// }

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

// export const fetchReviews = (id) => async (dispatch) => {
//   const response = await fetch(`/api/products/${id}`);

//   if (response.ok) {
//     const data = await response.json();
//     let normalizedData = {}
//     data.forEach((review) => (normalizedData[review.id] = review));
//     dispatch(getReviews(normalizedData));
//   }
// }

// const initialState = {}

// const reviewsReducer = (state = initialState, action) => {
//   let newState = { ...state };
//   switch (action.type) {
//     case GET_REVIEWS:
//       newState[""]
//       return state
//   }
// }

// export default reviewsReducer
