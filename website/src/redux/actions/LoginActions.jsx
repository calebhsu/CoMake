/**
 * @file Actions pertaining to login.
 */

import { SET_AUTH_STATE, UPDATE_USER_INFO } from './ActionConstants';

/**
 * Action for setting auth state of user
 * @param  {Boolean} authState Boolean Whether user is logged in.
 * @return {Object}          Action for determining pages shown to user.
 */
 export const setAuthState = (authState) => ({
   type: SET_AUTH_STATE,
   payload: authState,
 });

/**
 * Action to update the user information.
 * @param  {Object} userInfo Object with userid, username, photoURL, and email.
 * @return {Object}          Action to be performed.
 */
 export const updateUserInfo = (userInfo) => ({
   type: UPDATE_USER_INFO,
   payload: userInfo,
 });
