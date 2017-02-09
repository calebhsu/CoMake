import * as firebase from 'firebase';

/** 
 * Opens login prompt for user and redirects them to the home page if successful.
 * @param none
 * @return none
 */
function promptForLogin() {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then(result => {
    const user = result.user;
    const uid = user.uid;
    const user_email = user.email;
    const user_displayName = user.displayName;
    const user_emailVerified = user.emailVerified;
    const user_isAnonymous = user.isAnonymous;
    const user_providerData = user.providerData[0];
    const user_providerId = user.providerId;

    // check if account already exists, if not add an entry.
    const accountCheck = firebase.database().ref('users/' + uid);
    accountCheck.once("value", snapshot => {
      if (snapshot.val() === null) {
        accountCheck.set({
          admin: 'false',
          email: user_email,
          emailVerified: user_emailVerified,
          isAnonymous: user_isAnonymous,
          providerData: user_providerData,
          providerID: user_providerId
        });
      }
    });
    document.location = "/#/home";
  }).catch(function(error) {
    console.log(error);
  });
}

/** 
 * Manages the login for a user, if they are not logged in prompt for a log in.
 * @param none
 * @return none
 */
export function manageLogin() {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      uidCallback(user.uid);
    } else {
      promptForLogin();
    }
  });
}

/** 
 * Signs the user out and redirects them to the landing page
 * @param none
 * @return none
 */
export function signOut() {
  firebase.auth().signOut();
  document.location = "/";
}