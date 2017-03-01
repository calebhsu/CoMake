/**
 * @file Combine and export all of the reducers.
 */

import { combineReducers } from 'redux';

import { updateElementReducer } from './ElementReducer';
import { activeElementReducer } from './ActiveElementReducer';

/**
 * An object with all the specified reducers combined
 */
const reducers = combineReducers({
  updateElementReducer,
  activeElementReducer,
});

export default reducers;
