/**
 * @file Actions relating to craftml code generation.
 */

import * as AC from './ActionConstants';

/**
 * Action for updating the code.
 * @return {Object} Action for updating the code.
 */
export const updateCode = () => ({
  type: AC.UPDATE_CODE,
});

/**
 * Action for clearing the code.
 * @return {Object} Action for clearing the code.
 */
export const clearCode = () => ({
  type: AC.CLEAR_CODE,
});

/**
 * Action for toggling whether code should be automatically updated.
 * @return {Object} Action for toggling auto code updating.
 */
export const toggleAutoCodeUpdate = () => ({
  type: AC.TOGGLE_AUTO_CODE_UPDATE,
})
