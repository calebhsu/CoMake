/**
 * @file Helper of saving and fetching images saved for firebase storage.
 */

import * as firebase from 'firebase';

const RENDER_IMAGE_PATH = 'images/rendered_images/';

/**
 * Save an image to the rendered_images directory.
 * @param  {String} canvasId  The ID of the associated canvas.
 * @param  {String} imageURL  URL for the image.
 * @param  {Function} onSuccess Function to be performed when done.
 * @return {void}
 */
export const saveRenderedImage = (canvasId, imageURL, onSuccess) => {
  const imagePath = RENDER_IMAGE_PATH + String(canvasId) + '.png';
  const imageRef = firebase.storage().ref().child(imagePath);
  imageRef.putString(imageURL, 'data_url').then((snapshot) => {
    if (onSuccess) {
      onSuccess();
    }
  });
}
