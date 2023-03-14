import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import products from './products'
import cart from './cart'
<<<<<<< HEAD
import reviews from './reviews'
=======

import orders from './orders'

import reviews from './revews'
>>>>>>> 3e950a63a8ba3f8bcac772c1d61809a608e25b5e


const rootReducer = combineReducers({
  session,
  products,
  cart,
  orders,
  reviews

});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
