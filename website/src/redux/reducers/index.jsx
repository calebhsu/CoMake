/**
 * @file Combine and export all of the reducers.
 */

import { combineReducers } from 'redux';

import positions from './positionsReducer';
import { userInfoReducer } from './LoginReducer';

/**
 * An object with all the specified reducers combined
 */
const reducers = combineReducers({
  positions,
  userInfoReducer,
});

export default reducers;
