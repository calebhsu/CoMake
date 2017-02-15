/**
 * @file Combine and export all of the reducers.
 */

import { combineReducers } from 'redux';

import { updateElementReducer, targetElementReducer } from './ElementReducer';

/**
 * An object with all the specified reducers combined
 */
const reducers = combineReducers({
  updateElementReducer,
  targetElementReducer,
});

export default reducers;
