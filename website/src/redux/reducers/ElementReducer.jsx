/**
 * @file Reducers having to do with the position of elements.
 */

import {
  INIT_ELEMENTS, UPDATE_POSITION, UPDATE_SIZE, TARGET_ELEMENT,
} from './../actions/ActionConstants';

/**
 * Inserts payload information into state, making a new object.
 * @param {Object} state The state of the store.
 * @param {Object} elementId ID of the element affected.
 * @param {String} objectField The field of the element to update.
 * @param {Object} payload The updated information to insert.
 * @returns {Object} The new state object.
 */
function copyPayloadInfo(state, elementId, objectField, payload) {
  if(!payload) {
    return state;
  }
  // Copy the appropriate field.
  const fieldToUpdate = {};
  fieldToUpdate[objectField] = Object.assign({}, payload);
  // Make copy of the element with new field.
  const elemToUpdate = {};
  elemToUpdate[elementId] = Object.assign({}, state.elements[elementId],
    fieldToUpdate);
  // Make new state with new copy of element inserted
  const updatedElements = Object.assign({}, state.elements, elemToUpdate);
  return Object.assign({}, state, {
    elements: updatedElements,
  });
}

/**
 * Update the position in firebase.
 * @param {Object} state The state of the store.
 * @param {Object} action action to be performed.
 * @returns {Object} The new state object.
 */
export const updateElementReducer = (state = { elements: {} }, action) => {
  switch (action.type) {
    case INIT_ELEMENTS:
      return Object.assign({}, state, {
        elements: action.elements,
      }, {
        targeted: null,
      });

    case UPDATE_POSITION:
      return copyPayloadInfo(state, action.elementId, 'position', action.payload);

    case UPDATE_SIZE:
      return copyPayloadInfo(state, action.elementId, 'size', action.payload);

    default:
      return state
  }
};

/**
 * Reduces the action for when a new element is targeted.
 * @param  {Object} state The state of the store.
 * @param  {Object} action The action to reduce.
 * @return {Object} The new state of the store.
 */
export const targetElementReducer = (state = { elements: {} }, action ) => {
  switch (action.type) {
    case TARGET_ELEMENT:
      return Object.assign({}, state, {
        targeted: action.elementId,
      });
    default:
      return state;
  }
}
