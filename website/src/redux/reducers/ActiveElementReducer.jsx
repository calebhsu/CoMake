/**
 * @file Reducers for active element branch.
 */

 import * as AC from './../actions/ActionConstants';
 import * as RC from './ReducerConstants';
 import { insertIntoState } from './ReducerUtil';

/**
 * Reduces the action for when a new element is targeted i.e. clicked by user.
 * @param  {Object} state The state of the store.
 * @param  {Object} action The action to reduce.
 * @return {Object} The new state of the store.
 */
export const activeElementReducer = (state = RC.BLANK_STATE_ACTIVE_ELEMENT, action) => {
  const pathToChange = [RC.ACTIVE_ELEMENT];
  switch (action.type) {
    case AC.TARGET_ELEMENT:
      // Nothing to add.
      break;
    case AC.REMOVE_ELEMENT:
      if (state[RC.ACTIVE_ELEMENT] === action.elementId) {
        return insertIntoState(state, null, pathToChange);
      } else {
        return state;
      }
    default:
      // Any other action just return we do not want to handle.
      return state;
  }
  return insertIntoState(state, action.payload, pathToChange);
}
