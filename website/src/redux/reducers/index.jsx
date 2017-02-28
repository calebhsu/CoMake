/**
 * @file Combine and export all of the reducers.
 */

import { combineReducers } from 'redux';

import { userInfoReducer } from './LoginReducer';
import { updateElementReducer } from './ElementReducer';
import { currentCanvasReducer } from './CurrentCanvasReducer';

/**
 * An object with all the specified reducers combined
 */
const reducers = combineReducers({
  userInfoReducer,
  updateElementReducer,
  currentCanvasReducer,
});

export default reducers;
