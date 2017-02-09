/* Combine and export all of the reducers. */

import { combineReducers } from 'redux';

import positions from './positionsReducer';

const reducers = combineReducers({
  positions,
});

export default reducers;
