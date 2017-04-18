/**
 * @file Combine and export all of the reducers.
 */

import { combineReducers } from 'redux';

import { userInfoReducer } from './LoginReducer';
import { updateElementReducer } from './ElementReducer';
import { activeElementReducer } from './ActiveElementReducer';
import { canvasReducer } from './CanvasReducer';
import { craftmlCodeReducer } from './CraftmlCodeReducer';

/**
 * An object with all the specified reducers combined
 */
const reducers = combineReducers({
  userInfoReducer,
  updateElementReducer,
  activeElementReducer,
  canvasReducer,
  craftmlCodeReducer,
});

export default reducers;
