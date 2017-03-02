/**
 * @file Reducers having to do with the position of elements.
 */

import {
  INIT_ELEMENTS, UPDATE_POSITION, UPDATE_SIZE, UPDATE_ROTATION
} from './../actions/ActionConstants';

import * as RC from './ReducerConstants';
import { insertIntoState } from './ReducerUtil';

/**
 * Update the position in firebase.
 * @param {Object} state The state of the store.
 * @param {Object} action action to be performed.
 * @returns {Object} The new state object.
 */
export const updateElementReducer = (state = RC.BLANK_STATE, action) => {
  const pathToChange = [RC.CURRENT_CANVAS, RC.CANVAS_ELEMENTS];
  switch (action.type) {
    case INIT_ELEMENTS:
      // Do nothing we already have the right path.
      break;
    case UPDATE_POSITION:
      pathToChange.push(action.elementId);
      pathToChange.push(RC.ELEMENT_POSITION);
      break;
    case UPDATE_SIZE:
      pathToChange.push(action.elementId);
      pathToChange.push(RC.ELEMENT_SIZE);
      break;
    case UPDATE_ROTATION:
      pathToChange.push(action.elementId);
      pathToChange.push(RC.ELEMENT_ROTATION);
      break;
    default:
      // Reducer should not do anything otherwise so return.
      return state
  }
  return insertIntoState(state, action.payload, pathToChange);
};
