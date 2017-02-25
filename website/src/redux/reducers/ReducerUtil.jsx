/**
 * @file Utility functions for Redux reducers.
 */

import * as RC from './ReducerConstants';

/**
 * Inserts/overwrites the given information into a deeep copy of the state.
 * @param  {Object} state       The current redux state.
 * @param  {Any} toInsert    The value to be inserted into the state.
 * @param  {List} pathToField The path to the information to be changed
 *                            e.g. [CURRENT_CANVAS, CANVAS_ADMIN]
 * @return {Object}             A new deep copy of the state with the specified
 *                                updated.
 */
export const insertIntoState = (state, toInsert, pathToField) => {
  if (pathToField.length === 0) {
    return state;
  }
  // Make deep copy of the current state if this part already exists.
  const copy = typeof(state) === 'undefined' ? {} : Object.assign({}, state);
  if (pathToField.length === 1) {
    if (typeof(toInsert) === 'object') {
      toInsert = Object.assign({}, toInsert);
    }
    copy[pathToField[0]] = toInsert;
    return copy;
  } else {
    copy[pathToField[0]] = insertIntoState(state[pathToField[0]], toInsert,
      pathToField.slice(1, pathToField.length))
    return copy;
  }
}

/**
 * Returns a path for a specific element's attribute.
 * @param  {String} elementId   The id for the element in question.
 * @param  {String} elementAttr The attribute for the element.
 * @return {List}             List representing the desired path.
 * @throws {Error}              Error thrown if elementAttr is not valid.
 */
export const formPathToElementAttr = (elementId, elementAttr) => {
  if (RC.ELEMENT_ATTRS.indexOf(elementAttr) === -1) {
    throw new Error('Invalid Element Attribute.');
  }
  return [RC.CURRENT_CANVAS, RC.CANVAS_ELEMENTS, elementId,
    elementAttr];
}
