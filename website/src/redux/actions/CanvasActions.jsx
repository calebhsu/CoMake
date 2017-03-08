/**
 * @file Actions relating to canvases.
 */

import * as AC from './ActionConstants';


/**
 * Change the currently targeted element.
 * @param {String} canvasId Id for the canvas.
 * @param {Objeect} canvasInfo Information for the canvas.
 * @returns {Object} The object detailing the action.
 */
export const addCanvas = (canvasId, canvasInfo) => ({
  type: AC.ADD_CANVAS,
  canvasId: canvasId,
  payload: canvasInfo,
});

/**
 * Add a user to the canvas.
 * @param {String} canvasId Id for the canvas.
 * @param {String} userId Id for the user.
 * @returns {Object} The object detailing the action.
 */
export const addCanvasUser = (canvasId, userId) => ({
  type: AC.ADD_CANVAS_USER,
  canvasId: canvasId,
  payload: userId,
});

/**
 * Action for removing a canvas.
 * @param  {String} canvasId Id of the canvas to remove.
 * @return {Object}          Object detailing the action.
 */
export const removeCanvas = (canvasId) => ({
  type: AC.REMOVE_CANVAS,
  canvasId: canvasId,
});

/**
 * Action for setting the current canvas.
 * @param {String} canvasId Id for the canvas to be set as current.
 * @returns {Object} The object detailing the action.
 */
export const setCurrentCanvas = (canvasId) => ({
  type: AC.SET_CURRENT_CANVAS,
  payload: canvasId,
});

/**
 * Action for setting a canvas name.
 * @param {String} canvasId Id for the canvas to have its name changed.
 * @param {String} canvasName Name that the canvas will be given from now on.
 * @returns {Object} The object detailing the action.
 */
export const setCanvasName = (canvasId, canvasName) => ({
  type: AC.SET_CANVAS_NAME,
  canvasId: canvasId,
  payload: canvasName,
});

/**
 * Action for setting a canvas owner.
 * @param {String} canvasId Id for the canvas to have its name changed.
 * @param {String} canvasOwner Owner that the canvas will be given from now on.
 * @returns {Object} The object detailing the action.
 */
export const setCanvasOwner = (canvasId, canvasOwner) => ({
  type: AC.SET_CANVAS_OWNER,
  canvasId: canvasId,
  payload: canvasOwner,
});
