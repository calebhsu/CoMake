/**
 * @file Reducer for login actions.
 */

import { UPDATE_USER_INFO } from './../actions/ActionConstants';

 /**
  * Update the position in firebase.
  * @param {Object} state The state of the store.
  * @param {Object} action action to be performed.
  * @returns {Object} The new state object.
  */
 export const userInfoReducer = (state = { elements: {} }, action) => {
   switch (action.type) {
     case UPDATE_USER_INFO:
      const newState = Object.assign({}, state, {
        userInfo: action.payload
      });
      return newState;
     default:
      return state;
   }
 };
