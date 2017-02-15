/**
 * @file File of all the possible actions we can take on the Redux store.
 */

import { setElementLocation, setElementSize } from '../../firebase-utils';
import {
  INIT_ELEMENTS, UPDATE_POSITION, UPDATE_SIZE, UPDATE_ROTATION,
  TARGET_ELEMENT
} from './ActionConstants';


/**
 * Gives the action for initializing positions.
 * @param {Object} elemList Object of the element details.
 * @returns {Object} The object detailing the action details.
 */
export const initElements = elemList => ({
  type: INIT_ELEMENTS,
  elements: elemList,
});

/**
 * Gives the action for updating a position.
 * @param {String} elementId String of the elment ID.
 * @param {Object} updatedSize Object detailing the updated location.
 * @returns {Object} The object detailing the action details.
 */
export const updatePosition = (elementId, updatedSize) => ({
  type: UPDATE_POSITION,
  elementId: elementId,
  payload: updatedSize,
});

/**
 * Gives the action for updating the size.
 * @param {String} elementId String of the elment ID.
 * @param {Object} updatedRotation Object detailing the updated location.
 * @returns {Object} The object detailing the action details.
 */
export const updateSize = (elementId, updatedRotation) => ({
  type: UPDATE_SIZE,
  elementId: elementId,
  payload: updatedRotation,
});

/**
 * Gives the action for updating the rotation.
 * @param {String} elementId String of the elment ID.
 * @param {Object} updatedLoc Object detailing the updated location.
 * @returns {Object} The object detailing the action details.
 */
export const updateRotation = (elementId, updatedLoc) => ({
  type: UPDATE_ROTATION,
  elementId: elementId,
  payload: updatedLoc,
});

/**
 * Update the location and update on fireabse.
 * @param {Function} action The update action to be performed.
 * @param {String} elementId String of the elment ID.
 * @param {Object} updatedVal Object detailing the updated location.
 * @returns {Promise} A promise on the firebase set call
 */
export const updateAndPersist = (action, elementId, updatedVal) => (
  (dispatch) => {
    dispatch(action(elementId, updatedVal));
    switch (action.type) {
      case UPDATE_POSITION:
        return setElementLocation(elementId, updatedVal);
      case UPDATE_SIZE:
        return setElementSize(elementId, updatedVal);
      case UPDATE_ROTATION:
        return;
      default:
        return;
    }
  }
);

/**
 * Change the currently targeted element.
 * @param {String} elementId String of the element ID.
 * @returns {Object} The object detailing the action details.
 */
export const targetElement = (elementId) => ({
  type: TARGET_ELEMENT,
  elementId: elementId,
})
