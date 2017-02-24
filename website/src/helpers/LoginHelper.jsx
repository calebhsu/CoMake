import * as firebase from 'firebase';
import CoMakeServices from 'comake-services';

import { updateUserInfo } from './../redux/actions/LoginActions';
import ServiceEndpoint from '../ServiceEndpoint';

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
              .sendRequest(reqBody, ServiceEndpoint, () => {
                console.log('made it fool');
              });
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

/**
 * Gets user infos and updates the state
 * @param  {function} dispatch The dispatch function for redux
 * @returns {void}
 */
export const getUserInfo = (dispatch) => {
  const currentUser = firebase.auth().currentUser;

  if(currentUser) {
    dispatch(updateUserInfo(
      currentUser.displayName,
      currentUser.photoURL
    ));
  }
}
