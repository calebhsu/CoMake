/**
 * @file Combine and export all of the reducers.
 */

import { combineReducers } from 'redux';

import positions from './positionsReducer';

/**
 * An object with all the specified reducers combined
 */
const reducers = combineReducers({
  positions,
});

export default reducers;
