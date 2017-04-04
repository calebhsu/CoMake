/**
 * @file Combine and export all of the reducers.
 */

import { combineReducers } from 'redux';

import { userInfoReducer } from './LoginReducer';
import { updateElementReducer } from './ElementReducer';
import { activeElementReducer } from './ActiveElementReducer';
import { canvasReducer } from './CanvasReducer';

import { CLEAR } from '../actions/ActionConstants';

/**
 * An object with all the specified reducers combined
 */
const mainReducers = combineReducers({
  userInfoReducer,
  updateElementReducer,
  activeElementReducer,
  canvasReducer,
});

//http://stackoverflow.com/questions/35622588/how-to-reset-the-state-of-a-redux-store/35641992#35641992
const reducers = (state, action) => {
  if(action.type === CLEAR) {
    state = undefined;
  }

  return mainReducers(state, action);
}

export default reducers;
