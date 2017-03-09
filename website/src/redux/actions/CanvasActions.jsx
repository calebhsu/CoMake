/**
 * @file Actions relating to canvases.
 */

import * as AC from './ActionConstants';
import * as FBHelper from '../../helpers/FirebaseHelper';


/**
 * Change the currently targeted element.
 * @param   {String}  canvasId   Id for the canvas.
 * @param   {Object} canvasInfo Information for the canvas.
 * @returns {Object}  			 The object detailing the action.
 */
export const addCanvas = (canvasId, canvasInfo) => ({
  type: AC.ADD_CANVAS,
  canvasId: canvasId,
  payload: canvasInfo,
});

/**
 * Add a user to the canvas.
 * @param   {String} canvasId Id for the canvas.
 * @param   {String} userId   Id for the user.
 * @param   {Object} userInfo The information for the user.
 * @returns {Object} 		  The object detailing the action.
 */
export const addCanvasUser = (canvasId, userId, userInfo) => ({
  type: AC.ADD_CANVAS_USER,
  canvasId: canvasId,
  userId: userId,
  payload: userInfo,
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
 * Action for removing a user from the canvas.
 * @param  {String} canvasId Id of the canvas to remove.
 * @param  {String} userId 	 Id of the user to remove.
 * @return {Object}          Object detailing the action.
 */
export const removeCanvasUser = (canvasId, userId) => ({
  type: AC.REMOVE_CANVAS_USER,
  canvasId: canvasId,
  userId: userId,
});

/**
 * Action for setting the current canvas.
 * @param   {String} canvasId Id for the canvas to be set as current.
 * @returns {Object} 		  The object detailing the action.
 */
export const setCurrentCanvas = (canvasId) => ({
  type: AC.SET_CURRENT_CANVAS,
  payload: canvasId,
});

/**
 * Action for setting a canvas name.
 * @param   {String} canvasId   Id for the canvas to have its name changed.
 * @param   {String} canvasName Name that the canvas will be given from now on.
 * @returns {Object} 			The object detailing the action.
 */
export const setCanvasName = (canvasId, canvasName) => ({
  type: AC.SET_CANVAS_NAME,
  canvasId: canvasId,
  payload: canvasName,
});

/**
 * Action for setting canvas name and having it persist on firebase.
 * @param {String} canvasId   ID for the canvas to change.
 * @param {String} canvasName New name for the canvas.
 * @returns {Promise}         A promise on the firebase set call
 */
export const setCanvasNameAndPersist = (canvasId, canvasName) => (
  (dispatch) => {
    dispatch(setCanvasName(canvasId, canvasName));
    return FBHelper.setCanvasName(canvasId, canvasName);
  }
);

/**
 * Action for setting a canvas owner.
 * @param   {String} canvasId 	 Id for the canvas to have its name changed.
 * @param   {String} canvasOwner Owner that the canvas will be given from now on.
 * @returns {Object} 			 The object detailing the action.
 */
export const setCanvasOwner = (canvasId, canvasOwner) => ({
  type: AC.SET_CANVAS_OWNER,
  canvasId: canvasId,
  payload: canvasOwner,
});
