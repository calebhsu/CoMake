/**
 * @file File of all the possible actions we can take on the Redux store.
 */

import {
  setElementLocation, setElementSize, setElementRotation
} from '../../helpers/FirebaseHelper';
import {
  INIT_ELEMENTS, UPDATE_POSITION, UPDATE_SIZE, UPDATE_ROTATION,
  TARGET_ELEMENT
} from './ActionConstants';


/**
 * Gives the action for initializing the canvas elements.
 * @param {Object} elemList Object of the element details.
 * @returns {Object} The object detailing the action details.
 */
export const initElements = elemList => ({
  type: INIT_ELEMENTS,
  elements: elemList,
});

/**
 * Gives the action for updating a position.
 * @param {String} updateType Type of update to be performed.
 * @param {String} elementId String of the elment ID.
 * @param {Object} updatedPosition Object detailing the updated location.
 * @returns {Object} The object detailing the action details.
 */
export const updateElement = (updateType, elementId, updatedPosition) => ({
  type: updateType,
  elementId: elementId,
  payload: updatedPosition,
});

/**
 * Update the location and update on fireabse.
 * @param {String} updateType The type of update to be performed.
 * @param {String} elementId String of the elment ID.
 * @param {Object} updatedVal Object detailing the updated location.
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
        return setElementRotation(elementId, Object.values(updatedVal)[0]);
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
