/* Combine and export all of the reducers. */

import { combineReducers } from 'redux';

import positions from './positions';

const reducers = combineReducers({
  positions,
});

export default reducers;
