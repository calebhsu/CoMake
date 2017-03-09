/**
 * @file Reducers for canvas actions.
 */

 import * as AC from './../actions/ActionConstants';
 import * as RC from './ReducerConstants';
 import { insertIntoState, removeField } from './ReducerUtil';

/**
 * Reduces the action for when a canvas actions.
 * @param  {Object} state The state of the store.
 * @param  {Object} action The action to reduce.
 * @return {Object} The new state of the store.
 */
export const canvasReducer = (state = RC.BLANK_STATE, action) => {
  const pathToChange = [];
  switch (action.type) {
    case AC.ADD_CANVAS:
      pathToChange.push(RC.CANVASES);
      pathToChange.push(action.canvasId);
      break;
    case AC.ADD_CANVAS_USER:
      pathToChange.push(RC.CANVASES);
      pathToChange.push(action.canvasId);
      pathToChange.push(RC.CANVAS_USERS);
      pathToChange.push(action.userId);
      break;
    case AC.REMOVE_CANVAS:
      pathToChange.push(RC.CANVASES);
      pathToChange.push(action.canvasId);
      return removeField(state, pathToChange);
    case AC.SET_CURRENT_CANVAS:
      pathToChange.push(RC.CURRENT_CANVAS);
      break;
    case AC.SET_CANVAS_NAME:
      pathToChange.push(RC.CANVASES);
      pathToChange.push(action.canvasId);
      pathToChange.push(RC.CANVAS_NAME);
      break;
    case AC.SET_CANVAS_OWNER:
      pathToChange.push(RC.CANVASES);
      pathToChange.push(action.canvasId);
      pathToChange.push(RC.CANVAS_OWNER);
      break;
    case AC.REMOVE_CANVAS_USER:
      pathToChange.push(RC.CANVASES);
      pathToChange.push(action.canvasId);
      pathToChange.push(RC.CANVAS_USERS);
      pathToChange.push(action.userId);
      return removeField(state, pathToChange);
    default:
      // Any other action just return we do not want to handle.
      return state;
  }
  return insertIntoState(state, action.payload, pathToChange);
}
