/**
 * @file File to compile redux store helpers.
 */

import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';

import reducers from '../reducers';

/**
 * Constructs
 * @returns {Store} A redux store with the reducers from the reducers folder and the thunk middleware applied to it.
 */
const storeConstructor = () => {
  return createStore(reducers,
    applyMiddleware(
      thunkMiddleware
    )
  );
};

export default {
  constructStore: storeConstructor
}
