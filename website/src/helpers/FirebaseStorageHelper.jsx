/**
 * @file Helper of saving and fetching images saved for firebase storage.
 */

import * as firebase from 'firebase';

const RENDER_IMAGE_PATH = 'images/rendered_images/';
export const PAUSED = firebase.storage.TaskState.PAUSED;

/**
 * Save an image to the rendered_images directory.
 * @param  {String} canvasId  The ID of the associated canvas.
 * @param  {String} imageURL  URL for the image.
 * @param  {Function} onSuccess Function to be performed when done.
 * @param  {Function} onFailure  Function to be performed when there is an error
 *                               takes parameter error.
 * @param  {Function} processing  Function to be performed while uploading
 *                                takes parameter snapshot.
 * @return {void}
 */
export const saveRenderedImage = (canvasId, imageURL, onSuccess, onFailure,
    processing) => {
  const imagePath = RENDER_IMAGE_PATH + String(canvasId) + '.png';
  const imageRef = firebase.storage().ref().child(imagePath);
  const imageTask = imageRef.putString(imageURL, 'data_url');
  imageTask.on(firebase.storage.TaskEvent.STATE_CHANGED, processing, onFailure,
    onSuccess);
}

/**
 * Gets the rendered image url and hands it off to urlHanlder.
 * @param  {String} canvasId   The ID of the canvas.
 * @param  {Function} urlHandler Function that is fed the image url.
 * @return {void}
 */
export const getRenderedImageUrl = (canvasId, urlHandler) => {
  const imagePath = RENDER_IMAGE_PATH + String(canvasId) + '.png';
  const imageRef = firebase.storage().ref().child(imagePath);
  imageRef.getDownloadURL().then((url) => {
    urlHandler(url);
  }).catch((error) => {
    console.log(error);
  });
}
