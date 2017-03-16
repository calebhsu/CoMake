/**
 * @file File to compile redux store helpers.
 */

import { applyMiddleware, compose, createStore } from 'redux';
import createActionBuffer from 'redux-action-buffer';
import { autoRehydrate } from 'redux-persist';
import { REHYDRATE } from 'redux-persist/constants';
import thunkMiddleware from 'redux-thunk';

import reducers from './reducers';

/**
 * Constructs
 * @returns {Store} A redux store with the reducers from the reducers folder and the thunk middleware applied to it.
 */
const storeConstructor = () => {
  return createStore(
    reducers,
    {},
    compose(
      autoRehydrate(),
      applyMiddleware(
        thunkMiddleware,
        createActionBuffer(REHYDRATE)
      )
    )
  );
};

export default {
  constructStore: storeConstructor
}
