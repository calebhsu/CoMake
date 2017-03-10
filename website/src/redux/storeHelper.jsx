/**
 * @file File to compile redux store helpers.
 */

import { applyMiddleware, compose, createStore } from 'redux';
import { autoRehydrate } from 'redux-persist';
import thunkMiddleware from 'redux-thunk';

import reducers from './reducers';

/**
 * Constructs
 * @returns {Store} A redux store with the reducers from the reducers folder and the thunk middleware applied to it.
 */
const storeConstructor = () => {
  return createStore(reducers,
    undefined,
    compose(
      applyMiddleware(
        thunkMiddleware
      ),
      autoRehydrate()
    )
  );
};

export default {
  constructStore: storeConstructor
}
