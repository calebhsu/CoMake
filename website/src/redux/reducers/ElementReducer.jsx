/**
 * @file Reducers having to do with the position of elements.
 */

import { INIT_ELEMENTS, UPDATE_POSITION } from './../actions/ActionConstants';

/**
 * Update the position in firebase.
 * @param {Object} state The state of the store.
 * @param {Object} action action to be performed.
 * @returns {Object} The new state object.
 */
const reducerElement = (state = { elements: {} }, action) => {
  switch (action.type) {
    case INIT_ELEMENTS:
      return Object.assign({}, state, {
        elements: action.elements,
      });

    case UPDATE_POSITION:
      if (!action.updatedLocation) {
        return state;
      }
      const elemToUpdate = {};
      elemToUpdate[action.elementId] = {
        position: {
          x: action.updatedLocation.x,
          y: action.updatedLocation.y,
        },
      };

      const updatedElements = Object.assign({}, state.elements, elemToUpdate);
      return Object.assign({}, state, {
        elements: updatedElements,
      });

    default:
      return state
  }
};

export default reducerElement;
