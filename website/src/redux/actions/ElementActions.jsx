/**
 * @file Possible actions we can take on the elements state branch.
 */

import * as FBHelper from '../../helpers/FirebaseHelper';
import * as AC from './ActionConstants';


/**
 * Gives the action for initializing the canvas elements.
 * @param {Object} elemList Object of the element details.
 * @returns {Object} The object detailing the action details.
 */
export const initElements = elemList => ({
  type: AC.INIT_ELEMENTS,
  payload: elemList,
});

/**
 * Gives the action for updating a position.
 * @param {String} updateType Type of update to be performed.
 * @param {String} elementId String of the elment ID.
 * @param {Any} updatedVal The new updated value.
 * @returns {Object} The object detailing the action details.
 */
export const updateElement = (updateType, elementId, updatedVal) => ({
  type: updateType,
  elementId: elementId,
  payload: updatedVal,
});

/**
 * Update the location and update on fireabse.
 * @param {String} updateType The type of update to be performed.
 * @param {String} elementId String of the elment ID.
 * @param {Any} updatedVal The new updated value..
 * @param {String} canvasId The ID of the canvas.
 * @returns {Promise} A promise on the firebase set call
 */
export const updateAndPersist = (updateType, elementId, updatedVal, canvasId) => (
  (dispatch) => {
    const actionObject = updateElement(updateType, elementId, updatedVal);
    dispatch(actionObject);
    switch (updateType) {
      case AC.UPDATE_POSITION:
        return FBHelper.setElementLocation(canvasId, elementId, updatedVal);
      case AC.UPDATE_SIZE:
        return FBHelper.setElementSize(canvasId, elementId, updatedVal);
      case AC.UPDATE_ROTATION:
        return FBHelper.setElementRotation(canvasId, elementId, updatedVal);
      default:
        return;
    }
  }
);

/**
 * Adds an element to the current canvas.
 * @param {String} elementId  The string for the element's ID.
 * @param {Object} elementObj Object for an element with position, size,
 *                            rotation, and module field.
 * @returns {Object}          The object detailing the action.
 */
export const addElement = (elementId, elementObj) => ({
  type: AC.ADD_ELEMENT,
  elementId: elementId,
  payload: elementObj,
});

/**
 * Action to remove an element on the current canvas.
 * @param  {String} elementId The id of the element.
 * @return {Object}           Object detailing the action.
 */
export const removeElement = (elementId) => ({
  type: AC.REMOVE_ELEMENT,
  elementId: elementId,
});

/**
 * Removes element from firebase and then returns removeElement
 * @param  {String} elementId The id of the element.
 * @return {Object}           Object detailing the action.
 * @param {String} canvasId The ID of the canvas.
 */
export const removeElementAndPersist = (elementId, canvasId) => (
  (dispatch) => {
    dispatch(removeElement(elementId));
    FBHelper.deleteElement(canvasId, elementId);
  }
)
