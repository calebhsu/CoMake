import * as firebase from 'firebase';

function promptForLogin() {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then(result => {
    var user = result.user;
    var uid = user.uid;
    var user_email = user.email;
    var user_displayName = user.displayName;
    var user_emailVerified = user.emailVerified;
    var user_isAnonymous = user.isAnonymous;
    var user_providerData = user.providerData[0];
    var user_providerId = user.providerId;

    // check if account already exists, if not add an entry.
    var accountCheck = firebase.database().ref('users/' + uid);
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

/* Manages the login for a user, if they are not logged in prompt for a log
 * in.
 *
 * Args:
 *  uidCallback: Callback to be executed with parameter of user id.
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


export function signOut() {
  firebase.auth().signOut();
  document.location = "/";
}