import * as firebase from 'firebase';
import CoMakeServices from 'comake-services';

import * as ClearActions from '../redux/actions/ClearActions';
import { setAuthState, updateUserInfo } from './../redux/actions/LoginActions';
import ServiceEndpoint from '../ServiceEndpoint';
import * as RC from '../redux/reducers/ReducerConstants';

/**
* Gets user's auth state and updates the state
* @param  {Function} dispatch The dispatch function for redux
* @returns {void}
*/
export const getAuthState = (dispatch) => {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      dispatch(setAuthState(true));
    }
    else {
      dispatch(setAuthState(false));
      document.location = "/#/"
    }
  });
}

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
 * Opens login prompt for user and redirects them to the home page if successful.
 * @param {Function} dispatch The function to dispatch an action to a redux store
 * @returns {void}
 */
export const performAndDispatchLogin = (dispatch) => {
  if(!(firebase.auth().currentUser))
  {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then((result) => {
      // check if account already exists, if not, add an entry.
      firebase.database().ref('users/' + result.user.uid).once("value")
        .then((userSnap) => {
          if (userSnap.val() === null) {
            const reqBody = CoMakeServices.UserInfoService
              .formPostBody(result.user.uid);

            CoMakeServices.UserInfoService
              .postRequest(reqBody, ServiceEndpoint, () => {
              });
          }
        });

      const actionPayload = {};
      actionPayload[RC.USER_ID] = result.user.uid;
      actionPayload[RC.USERNAME] = result.user.displayName;
      actionPayload[RC.USER_PHOTO_URL] = result.user.photoURL;
      actionPayload[RC.USER_EMAIL] = result.user.email;
      dispatch(updateUserInfo(actionPayload));
    });
  }
}

/**
 * Signs the user out and redirects them to the landing page
 * @param {Function} dispatch The function to dispatch an action to a redux store
 * @returns {void}
 */
export const signOut = (dispatch) => {
  firebase.auth().signOut().then(() => {
    dispatch(ClearActions.clear());
  });
}
