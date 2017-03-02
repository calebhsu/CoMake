/**
 * @file Possible actions we can take on the currentCanvas state branch.
 */

import {
  TARGET_ELEMENT
} from './ActionConstants';


/**
 * Change the currently targeted element.
 * @param {String} elementId String of the element ID.
 * @returns {Object} The object detailing the action details.
 */
export const targetElement = (elementId) => ({
  type: TARGET_ELEMENT,
  payload: elementId,
})
