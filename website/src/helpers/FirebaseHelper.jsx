/**
 * @file File to contain commonly used firebase functions/utilities
 */

import * as firebase from 'firebase';

import * as RC from '../redux/reducers/ReducerConstants';

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
 * @param {String} canvasId The ID of the canvas.
 * @param {String} elementId The ID of the element.
 * @param {Object} newLocation The new location to be updated.
 * @returns {Promise} The promise associated with the set action on firebase.
 */
export const setElementLocation = (canvasId, elementId, newLocation) => {
  const canvasPath = '/canvases/' + canvasId + '/elements';
  return firebase.database().ref(`${canvasPath}/${elementId}/position`)
    .set(newLocation);
};

/**
 *  Sets the items location on Firebase.
 * @param {String} canvasId The ID of the canvas.
 * @param {String} elementId The ID of the element.
 * @param {Object} newSize The new size to be updated.
 * @returns {Promise} The promise associated with the set action on firebase.
 */
export const setElementSize = (canvasId, elementId, newSize) => {
  const canvasPath = '/canvases/' + canvasId + '/elements';
  return firebase.database().ref(`${canvasPath}/${elementId}/size`)
    .set(newSize);
};

/**
 *  Sets the items location on Firebase.
 * @param {String} canvasId The ID of the canvas.
 * @param {String} elementId The ID of the element.
 * @param {Number} newRotation The new rotation to be updated.
 * @returns {Promise} The promise associated with the set action on firebase.
 */
export const setElementRotation = (canvasId, elementId, newRotation) => {
  const canvasPath = '/canvases/' + canvasId + '/elements';
  return firebase.database().ref(`${canvasPath}/${elementId}/rotation`)
    .set(newRotation);
};

/**
 * Deletes an element from the canvas.
 * @param {String} canvasId The ID of the canvas.
 * @param  {String} elementId Id of the element.
 * @return {Promise}           The promise associated with the firebase action.
 */
export const deleteElement = (canvasId, elementId) => {
  const canvasPath = '/canvases/' + canvasId + '/elements';
  return firebase.database().ref(`${canvasPath}/${elementId}`).remove();
}

/**
 * Adds an element to the canvas.
 * @param {String} canvasId The ID of the canvas.
 * @param {String} module       String of the module associated with the element.
 * @param {String} image        String of the image path associated with the element.
 * @param {Object} initPosition Initial position e.g. { x: 0, y: 0}
 * @param {Object} initSize     Initial size e.g. {width:0, height:0}
 * @param {Number} initRotation Initial rotation
 * @returns {Promise}           Promise associated with the firebase action.
 */
export const addElement = (canvasId, module, image, initPosition, initSize, initRotation) => {
  const canvasPath = '/canvases/' + canvasId + '/elements';
  const toPush = {};
  toPush[RC.ELEMENT_MODULE] = module;
  toPush[RC.ELEMENT_IMAGE] = image;
  toPush[RC.ELEMENT_POSITION] = initPosition;
  toPush[RC.ELEMENT_SIZE] = initSize;
  toPush[RC.ELEMENT_ROTATION] = initRotation;
  return firebase.database().ref(`${canvasPath}`).push(toPush);
}

/**
 * Clones the given element in the canvas.
 * @param  {String} canvasId        The canvas id.
 * @param  {Object} originalElement Object detailing the element to be cloned.
 * @param  {Object} initPosition    The initial position for the clone.
 * @return {Promise}                 Promise associated with the firebase action.
 */
export const cloneElement = (canvasId, originalElement, initPosition) => {
  const canvasPath = '/canvases/' + canvasId + '/elements';
  const toPush = Object.assign({}, originalElement);
  toPush[RC.ELEMENT_POSITION] = initPosition;
  return firebase.database().ref(`${canvasPath}`).push(toPush);
}

/**
 * Sets a canvas' name.
 * @param {String} canvasId      The canvas id.
 * @param {String} newCanvasName The new canvas name to be set.
 * @returns {Promise}            Promise associated with the firebase action.
 */
export const setCanvasName = (canvasId, newCanvasName) => {
  const canvasPath = '/canvases/' + canvasId + '/' + RC.CANVAS_NAME;
  return firebase.database().ref(`${canvasPath}`).set(newCanvasName);
}

/**
 * Sets notification that canvas has a corresponding image in storage.
 * @param {String} canvasId The canvas id.
 * @returns {Promise}   Promise associated with the firebase action.
 */
export const setHasCanvasImage = (canvasId) => {
  const canvasPath = '/canvases/' + canvasId + '/' + RC.CANVAS_IMAGE;
  return firebase.database().ref(`${canvasPath}`).set(true);
}

/**
 * Sets a canvas' orientation view.
 * @param {String} canvasId          The canvas id.
 * @param {String} canvasOrientation The new orientation view to be set.
 * @returns {Promise}                Promise associated with the firebase action.
 */
export const setCanvasOrientation = (canvasId, canvasOrientation) => {
  const canvasPath = '/canvases/' + canvasId + '/' + RC.CANVAS_ORIENTATION;
  return firebase.database().ref(`${canvasPath}`).set(canvasOrientation);
}
