/**
 * @file Utility functions for Redux reducers.
 */

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
  // Check if the currennt state exists, if not throw an error.
  if (!state) {
    throw new Error('Given path does not currently exist in state tree.');
  }
  // Make deep copy of the current state.
  const copy = Object.assign({}, state);
  if (pathToField.length === 1) {
    if (toInsert && typeof(toInsert) === 'object') {
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
 * Makes a copy of the state and then removes the desired field.
 * @param  {Object} state       The redux state.
 * @param  {List} pathToField The path to the information to be changed
 *                            e.g. [CURRENT_CANVAS, CANVAS_ADMIN]
 * @return {Object}             The new state.
 */
export const removeField = (state, pathToField) => {
  if (pathToField.length === 0) {
    return state;
  }
  // Check if the currennt state exists, if not throw an error.
  if (!state) {
    throw new Error('Given path does currently exist in state tree:'
      + pathToField.join());
  }
  // Make deep copy of the current state.
  const copy = Object.assign({}, state);
  if (pathToField.length === 1) {
    // Note that if this field does not exist, fails silently by default.
    delete copy[pathToField[0]];
    return copy;
  } else {
    copy[pathToField[0]] = removeField(state[pathToField[0]],
      pathToField.slice(1, pathToField.length))
    return copy;
  }
}
