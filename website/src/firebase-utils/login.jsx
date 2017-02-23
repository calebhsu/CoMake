import * as firebase from 'firebase';

import { updateUserInfo } from './../redux/actions/LoginActions';

/**
 * Opens login prompt for user and redirects them to the home page if successful.
 * @returns {void}
 */
function promptForLogin() {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then(result => {
    const user = result.user;
    const uid = user.uid;
    // check if account already exists, if not add an entry.
    const accountCheck = firebase.database().ref('users/' + uid);
    accountCheck.once("value").then(snapshot => {
      if (snapshot.val() === null) {
        accountCheck.set({
          admin: false,
          email: user.email,
          emailVerified: user.emailVerified,
          isAnonymous: user.isAnonymous,
          providerData: user.providerData[0],
          providerID: user.providerId
        });
      }
    });
    document.location = "/#/home";
  });
}

/**
 * Signs the user out and redirects them to the landing page
 * @returns {void}
 */
export function signOut() {
  firebase.auth().signOut();
  document.location = "/#/login";
}

/**
 * Gets user infos and updates the state
 * @param  {function} dispatch The dispatch function for redux
 * @return {void}
 */
export function getUserInfo(dispatch) {
  firebase.auth().onAuthStateChanged((user) => {
    if(user) {
      const username = firebase.auth().currentUser.displayName;
      const photoURL = firebase.auth().currentUser.photoURL;
      dispatch(updateUserInfo(username, photoURL));
    } else {
      promptForLogin();
    }
  });
}
