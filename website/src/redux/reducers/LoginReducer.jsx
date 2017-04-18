/**
 * @file Reducer for login actions.
 */

import { UPDATE_USER_INFO } from './../actions/ActionConstants';
import { REHYDRATE } from 'redux-persist/constants';

import * as RC from './ReducerConstants';
import { insertIntoState } from './ReducerUtil';

 /**
  * Update the position in firebase.
  * @param {Object} state The state of the store.
  * @param {Object} action action to be performed.
  * @returns {Object} The new state object.
  */
export const userInfoReducer = (state = RC.BLANK_STATE_USER_INFO, action) => {
  let payload = null;
  switch(action.type) {
    case REHYDRATE:
      if(action.payload[RC.LOGIN_REDUCER] && action.payload[RC.LOGIN_REDUCER][RC.USER_INFO]
        && action.payload[RC.LOGIN_REDUCER][RC.USER_INFO][RC.USER_ID]) {
          payload = action.payload[RC.LOGIN_REDUCER][RC.USER_INFO]
        }
      break;
    case UPDATE_USER_INFO:
      payload = action.payload;
      break;
    default:
      return state;
  }

  if(!payload)
    return state;

  return insertIntoState(state, payload, [RC.USER_INFO])
};
