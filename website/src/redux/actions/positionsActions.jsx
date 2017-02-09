/**
 * @file File of all the possible actions we can take on the Redux store.
 */

import { setItemLocation } from '../../firebase-utils';

/**
 * Gives the action for initializing positions.
 * @param {Object} elemList Object of the element details.
 * @returns {Object} The object detailing the action details.
 */
export const initPositions = elemList => ({
  type: 'initPositions',
  elements: elemList,
});

/**
 * Gives the action for initializing positions.
 * @param {String} elemId String of the elment ID.
 * @param {Object} updatedLoc Object detailing the updated location.
 * @returns {Object} The object detailing the action details.
 */
export const updatePosition = (elemId, updatedLoc) => ({
  type: 'updatePosition',
  elementId: elemId,
  updatedLocation: updatedLoc,
});

/**
 * Update the location and update on fireabse.
 * @param {String} elemId String of the elment ID.
 * @param {Object} updatedLoc Object detailing the updated location.
 * @returns {Promise} A promise on the firebase set call
 */
export const updatePositionAndPersist = (elemId, updatedLoc) => (
  (dispatch) => {
    dispatch(updatePosition(elemId, updatedLoc));
    return setItemLocation(elemId, updatedLoc);
  }
);
