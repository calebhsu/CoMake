/**
 * @file Combine and export all of the reducers.
 */

import { combineReducers } from 'redux';

import reduceElement from './ElementReducer';

/**
 * An object with all the specified reducers combined
 */
const reducers = combineReducers({
  reduceElement,
});

export default reducers;
