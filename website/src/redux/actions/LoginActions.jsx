/**
 * @file Actions pertaining to login.
 */

import { UPDATE_USER_INFO } from './ActionConstants';

/**
 * Action to update the user information.
 * @param  {Object} userInfo Object with userid, username, photoURL, and email.
 * @return {Object}          Action to be performed.
 */
 export const updateUserInfo = (userInfo) => ({
   type: UPDATE_USER_INFO,
   payload: userInfo,
 });
