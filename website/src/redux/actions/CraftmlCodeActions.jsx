/**
 * @file Actions relating to craftml code generation.
 */

import * as AC from './ActionConstants';

/**
 * Action for updating the code.
 * @param {String} code  The code to be set in the state.
 * @return {Object} Action for updating the code.
 */
export const setCode = (code) => ({
  type: AC.SET_CODE,
  payload: code,
});

/**
 * Action for toggling whether code should be automatically updated.
 * @return {Object} Action for toggling auto code updating.
 */
export const toggleAutoCodeUpdate = () => ({
  type: AC.TOGGLE_AUTO_CODE_UPDATE,
})
