/**
 * @file File of all the possible actions we can take on the Redux store.
 */

import { setItemLocation } from '../../firebase-utils';
import { INIT_ELEMENTS, UPDATE_POSITION, UPDATE_SIZE, UPDATE_ROTATION } from './ActionConstants';


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
 * @param {String} elemId String of the elment ID.
 * @param {Object} updatedLoc Object detailing the updated location.
 * @returns {Object} The object detailing the action details.
 */
export const updatePosition = (elemId, updatedLoc) => ({
  type: UPDATE_POSITION,
  elementId: elemId,
  updatedLocation: updatedLoc,
});

/**
 * Gives the action for updating the size.
 * @param {String} elemId String of the elment ID.
 * @param {Object} updatedLoc Object detailing the updated location.
 * @returns {Object} The object detailing the action details.
 */
export const updateSize = (elemId, updatedLoc) => ({
  type: UPDATE_SIZE,
  elementId: elemId,
  updatedLocation: updatedLoc,
});

/**
 * Gives the action for updating the rotation.
 * @param {String} elemId String of the elment ID.
 * @param {Object} updatedLoc Object detailing the updated location.
 * @returns {Object} The object detailing the action details.
 */
export const updateRotation = (elemId, updatedLoc) => ({
  type: UPDATE_ROTATION,
  elementId: elemId,
  updatedLocation: updatedLoc,
});

/**
 * Update the location and update on fireabse.
 * @param {Function} action The update function to be performed.
 * @param {String} elemId String of the elment ID.
 * @param {Object} updatedVal Object detailing the updated location.
 * @returns {Promise} A promise on the firebase set call
 */
export const updateAndPersist = (action, elemId, updatedVal) => (
  (dispatch) => {
    dispatch(action(elemId, updatedVal));
    switch (action.type) {
      case UPDATE_POSITION:
        return setItemLocation(elemId, updatedVal);
      case UPDATE_SIZE:
        return;
      case UPDATE_ROTATION:
        return;
      default:
        return;
    }
  }
);
