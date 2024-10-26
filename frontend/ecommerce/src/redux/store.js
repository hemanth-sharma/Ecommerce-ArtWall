import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const rootReducer = combineReducers({
  // e.g., products: productsReducer,
  // categories: categoriesReducer,
  // etc.
});

// Create the Redux store
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)) // Add middleware and dev tools
);

export default store;
