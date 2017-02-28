/**
 * @file Reducers for currentCanvas branch (minus elements).
 */

 import {
   TARGET_ELEMENT
 } from './../actions/ActionConstants';
 import * as RC from './ReducerConstants';
 import {
   insertIntoState
 } from './ReducerUtil';

/**
 * Reduces the action for when a new element is targeted i.e. clicked by user.
 * @param  {Object} state The state of the store.
 * @param  {Object} action The action to reduce.
 * @return {Object} The new state of the store.
 */
export const currentCanvasReducer = (state = RC.BLANK_STATE, action) => {
  const pathToChange = [RC.CURRENT_CANVAS];
  switch (action.type) {
    case TARGET_ELEMENT:
      pathToChange.push(RC.CANVAS_ACTIVE_ELEMENT);
      break;
    default:
      // Any other action just return we do not want to handle.
      return state;
  }
  return insertIntoState(state, action.payload, pathToChange);
}
