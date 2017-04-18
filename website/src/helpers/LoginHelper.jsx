import * as firebase from 'firebase';
import CoMakeServices from 'comake-services';

import { updateUserInfo } from './../redux/actions/LoginActions';
import ServiceEndpoint from '../ServiceEndpoint';
import * as RC from '../redux/reducers/ReducerConstants';

/**
* Gets user infos and updates the state
* @param  {Function} dispatch The dispatch function for redux
* @returns {void}
*/
export const getUserInfo = (dispatch) => {
  const currentUser = firebase.auth().currentUser;

  if(currentUser) {
    const actionPayload = {};
    actionPayload[RC.USER_ID] = currentUser.uid;
    actionPayload[RC.USERNAME] = currentUser.displayName;
    actionPayload[RC.USER_PHOTO_URL] = currentUser.photoURL;
    actionPayload[RC.USER_EMAIL] = currentUser.email;
    dispatch(updateUserInfo(actionPayload));
  }
}

/**
* Replaces current route with to login page route if no current user authenticated
* @param   {Object} nextState The next router state
* @param   {Function} replace The function that replaces the current path
* @returns {void}
*/
export const isLoggedIn = (nextState, replace) => {
  if (!(firebase.auth().currentUser)) {
    replace({
      pathname: '/login'
    });
  }
}

/**
 * Opens login prompt for user and redirects them to the home page if successful.
 * @returns {void}
 */
export const promptForLogin = () => {
  if(!(firebase.auth().currentUser))
  {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then((result) => {
      // check if account already exists, if not, add an entry.
      firebase.database().ref('users/' + result.user.uid).once("value")
        .then((userSnap) => {
          if (userSnap.val() === null) {
            const reqBody = CoMakeServices.UserInfoService
              .formRequestBody(result.user.uid);

            CoMakeServices.UserInfoService
              .sendRequest(reqBody, ServiceEndpoint, () => {});
          }
        });
      document.location = "/#/home";
    });
  }
}

/**
 * Signs the user out and redirects them to the landing page
 * @returns {void}
 */
export const signOut = () => {
  firebase.auth().signOut();
  document.location = "/#/login";
}
