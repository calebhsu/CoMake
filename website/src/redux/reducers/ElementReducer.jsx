/**
 * @file Reducers having to do with the position of elements.
 */

import {
  INIT_ELEMENTS, UPDATE_POSITION, UPDATE_SIZE, UPDATE_ROTATION, TARGET_ELEMENT,
} from './../actions/ActionConstants';

const BLANK_STATE = {
  elements: {},
  targeted: null,
};

const POSITION = 'position';
const SIZE = 'size';

/**
 * Inserts payload information into state, making a new object.
 * @param {Object} state The state of the store.
 * @param {Object} elementId ID of the element affected.
 * @param {Object} payload The updated information to insert.
 * @param {String} objectField The field of the element to update. If left as
 *                             null this indicates that the payload should not
 *                             be nested in another field.
 *                             e.g. elem[objectField][payload] vs elem[payload].
 * @returns {Object} The new state object.
 */
function copyPayloadInfo(state, elementId, payload, objectField = null) {
  if(!payload) {
    return state;
  }
  // Copy the appropriate field
  let fieldToUpdate = {};
  if (objectField === null) {
    fieldToUpdate = payload;
  } else {
    fieldToUpdate[objectField] = Object.assign({}, payload);
  }
  // Make copy of the element with new field.
  const updatedElement = {};
  updatedElement[elementId] = Object.assign({}, state.elements[elementId],
    fieldToUpdate);
  // Make new state with new copy of element inserted
  const updatedElements = Object.assign({}, state.elements, updatedElement);
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
export const updateElementReducer = (state = BLANK_STATE, action) => {
  switch (action.type) {
    case INIT_ELEMENTS:
      return Object.assign({}, state, {
        elements: action.elements,
      });

    case UPDATE_POSITION:
      return copyPayloadInfo(state, action.elementId, action.payload,
        POSITION);

    case UPDATE_SIZE:
      return copyPayloadInfo(state, action.elementId, action.payload, SIZE);

    case UPDATE_ROTATION:
      return copyPayloadInfo(state, action.elementId, action.payload);

    default:
      return state
  }
};

/**
 * Reduces the action for when a new element is targeted i.e. clicked by user.
 * @param  {Object} state The state of the store.
 * @param  {Object} action The action to reduce.
 * @return {Object} The new state of the store.
 */
export const targetElementReducer = (state = BLANK_STATE, action ) => {
  switch (action.type) {
    case TARGET_ELEMENT:
      return Object.assign({}, state, {
        targeted: action.elementId,
      });
    default:
      return state;
  }
}
