/**
 * @file Reducers for craftml code generation.
 */

import * as AC from './../actions/ActionConstants';

import * as RC from './ReducerConstants';
import { insertIntoState } from './ReducerUtil';
import { generateScript } from '../../craftml/ScriptGenerator';

/**
 * Update the position in firebase.
 * @param {Object} state The state of the store.
 * @param {Object} action action to be performed.
 * @returns {Object} The new state object.
 */
export const craftmlCodeReducer = (state = RC.BLANK_STATE, action) => {
  switch (action.type) {
    case AC.UPDATE_CODE:
      const generatedCode = generateScript(state[RC.ELEMENTS]);
      return insertIntoState(state, generatedCode, [RC.CODE]);
    case AC.CLEAR_CODE:
      return insertIntoState(state, '', [RC.CODE]);
    case AC.TOGGLE_AUTO_CODE_UPDATE:
      return insertIntoState(state, !state[RC.AUTO_GENERATE_CODE],
        [RC.AUTO_GENERATE_CODE]);
    default:
      // Reducer should not do anything otherwise so return.
      return state
  }
};
