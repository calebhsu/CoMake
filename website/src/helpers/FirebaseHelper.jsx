/**
 * @file File to contain commonly used firebase functions/utilities
 */

import * as firebase from 'firebase';

/**
 * A string to provide the firebase boards path
 */
export const BOARDS_PATH = '/test';

/**
 * Initializes the firebase app
 * @returns {FirebaseApp} A firebase app object initialized with the CoMake project
 */
export const initFirebase = () => {
  // start code from console.firebase.google.com
  const config = {
    apiKey: 'AIzaSyBouGOzw_GYXTl9_hkHhL2WZYvh1NHoQM0',
    authDomain: 'comake-95cb7.firebaseapp.com',
    databaseURL: 'https://comake-95cb7.firebaseio.com',
    storageBucket: 'comake-95cb7.appspot.com',
    messagingSenderId: '578562241026',
  };
  return firebase.initializeApp(config);
  // end sourced code
};

/**
 *  Sets the items location on Firebase.
 * @param {String} elementId The ID of the element.
 * @param {Object} newLocation The new location to be updated.
 * @returns {Promise} The promise associated with the set action on firebase.
 */
export const setElementLocation = (elementId, newLocation) => {
  return firebase.database().ref(`${BOARDS_PATH}/${elementId}/position`)
    .set(newLocation);
};

/**
 *  Sets the items location on Firebase.
 * @param {String} elementId The ID of the element.
 * @param {Object} newSize The new size to be updated.
 * @returns {Promise} The promise associated with the set action on firebase.
 */
export const setElementSize = (elementId, newSize) => {
  return firebase.database().ref(`${BOARDS_PATH}/${elementId}/size`)
    .set(newSize);
};

/**
 *  Sets the items location on Firebase.
 * @param {String} elementId The ID of the element.
 * @param {Number} newRotation The new rotation to be updated.
 * @returns {Promise} The promise associated with the set action on firebase.
 */
export const setElementRotation = (elementId, newRotation) => {
  return firebase.database().ref(`${BOARDS_PATH}/${elementId}/rotation`)
    .set(newRotation);
};
