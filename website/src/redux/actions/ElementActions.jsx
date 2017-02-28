/**
 * @file Possible actions we can take on the elements state branch.
 */

import {
  setElementLocation, setElementSize, setElementRotation
} from '../../firebase-utils';
import {
  INIT_ELEMENTS, UPDATE_POSITION, UPDATE_SIZE, UPDATE_ROTATION, ADD_ELEMENT
} from './ActionConstants';


/**
 * Gives the action for initializing the canvas elements.
 * @param {Object} elemList Object of the element details.
 * @returns {Object} The object detailing the action details.
 */
export const initElements = elemList => ({
  type: INIT_ELEMENTS,
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
 * Adds an element to the current canvas.
 * @param {String} elementId  The string for the element's ID.
 * @param {Object} elementObj Object for an element with position, size,
 *                            rotation, and module field.
 * @returns {Object}          The object detailing the action details.
 */
export const addElement = (elementId, elementObj) => ({
  type: ADD_ELEMENT,
  elementId: elementId,
  payload: elementObj,
});

/**
 * Update the location and update on fireabse.
 * @param {String} updateType The type of update to be performed.
 * @param {String} elementId String of the elment ID.
 * @param {Any} updatedVal The new updated value..
 * @returns {Promise} A promise on the firebase set call
 */
export const updateAndPersist = (updateType, elementId, updatedVal) => (
  (dispatch) => {
    const actionObject = updateElement(updateType, elementId, updatedVal);
    dispatch(actionObject);
    switch (updateType) {
      case UPDATE_POSITION:
        return setElementLocation(elementId, updatedVal);
      case UPDATE_SIZE:
        return setElementSize(elementId, updatedVal);
      case UPDATE_ROTATION:
        return setElementRotation(elementId, updatedVal);
      default:
        return;
    }
  }
);
