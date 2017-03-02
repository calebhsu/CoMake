/**
 * @file Actions pertaining to login.
 */

import { UPDATE_USER_INFO } from './ActionConstants';

/**
 * Action to update the user information.
 * @param  {String} username The username.
 * @param  {String} photoURL The photo url for the user.
 * @return {Object}          Action to be performed.
 */
 export const updateUserInfo = (username, photoURL, emailAddress) => ({
   type: UPDATE_USER_INFO,
   payload: {
     name: username,
     photo: photoURL,
     email: emailAddress,
   },
 });
