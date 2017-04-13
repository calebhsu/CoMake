/**
 * @file File to compile redux store helpers.
 */

import { applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';

import reducers from './reducers';

/**
 * Constructs the redux store and persists if specified
 * @param {Bool} persist whether or not to persist/rehyrdate the store
 * @param {Object} existingState the state to initialize the app with
 * @returns {Store} A redux store with the reducers from the reducers folder and the thunk middleware applied to it.
 */
const storeConstructor = (persist, existingState) => {

  let enhancers = null

  const composer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  if(persist) {
    //will persist
    enhancers = composer(
      applyMiddleware(
        thunkMiddleware
      )
    );
  }
  else {
    //won't persist
    enhancers = composer(
      applyMiddleware(
        thunkMiddleware
      )
    );
  }

  return createStore(
    reducers,
    existingState,
    enhancers
  );
};

export default {
  constructStore: storeConstructor
}
