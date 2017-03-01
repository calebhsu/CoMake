/**
 * @file Reducer for login actions.
 */

import { UPDATE_USER_INFO } from './../actions/ActionConstants';

import * as RC from './ReducerConstants';
import { insertIntoState } from './ReducerUtil';

 /**
  * Update the position in firebase.
  * @param {Object} state The state of the store.
  * @param {Object} action action to be performed.
  * @returns {Object} The new state object.
  */
export const userInfoReducer = (state = RC.BLANK_STATE, action) => {
  if(action.type === UPDATE_USER_INFO) {
    return insertIntoState(state, action.payload, [RC.USER_INFO])
  } else return state;
};
