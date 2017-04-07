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
 * Constructs the redux store and persists if specified
 * @param {Bool} persist whether or not to persist/rehyrdate the store
 * @returns {Store} A redux store with the reducers from the reducers folder and the thunk middleware applied to it.
 */
const storeConstructor = (persist) => {
  let enhancers = null
  const composer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  if(persist) {
    //will persist
    enhancers = composer(
      autoRehydrate(),
      applyMiddleware(
        thunkMiddleware,
        createActionBuffer(REHYDRATE)
      )
    );
  }
  else {
    //won't persist
    enhancers = applyMiddleware(
        thunkMiddleware
    );
  }
  return createStore(
    reducers,
    {},
    enhancers
  );
};
export default {
  constructStore: storeConstructor
}
