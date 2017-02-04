import * as firebase from 'firebase';

export const BOARDS_PATH = '/test';

/* Sets the items location on Firebase.
 * @param {String} The ID of the element.
 * @param {Object} The new location to be updated.
 */
export const setItemLocation = (elemId, newLocation) => {
  firebase.database().ref(`${BOARDS_PATH}/${elemId}/position`).set(newLocation);
};
