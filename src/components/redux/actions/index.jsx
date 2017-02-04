/* File of all the possible actions we can take on the Redux store.*/

import { setItemLocation } from '../../firebase-utils';

/* Gives the action for initializing positions.
 * @param {Object} Object of the element details.
 * @returns {Object} The object detailing the action details.
 */
export const initPositions = elemList => ({
  type: 'initPositions',
  elements: elemList,
});

/* Gives the action for initializing positions.
 * @param {String} String of the elment ID.
 * @param {Object} Object detailing the updated location.
 * @returns {Object} The object detailing the action details.
 */
export const updatePosition = (elemId, updatedLoc) => ({
  type: 'updatePosition',
  elementId: elemId,
  updatedLocation: updatedLoc,
});

/* Update the location and update on fireabse.
 * @param {String} String of the elment ID.
 * @param {Object} Object detailing the updated location.
 */
export const updatePositionAndPersist = (elemId, updatedLoc) => (
  (dispatch) => {
    dispatch(updatePosition(elemId, updatedLoc));
    return setItemLocation(elemId, updatedLoc);
  }
);
