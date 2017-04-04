/**
 * @file Actions to clear the redux store
 */

import { CLEAR } from './ActionConstants';

/**
 * Clear the redux store
 * @returns {Object} An object that represents the action
 */
export const clear = () => {
  console.log('here');
  return {type: CLEAR};
};
