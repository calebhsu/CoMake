import * as firebase from 'firebase';

/** 
 * Opens login prompt for user and redirects them to the home page if successful.
 */
function promptForLogin() {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then(result => {
    const user = result.user;
    const uid = user.uid;
    const user_displayName = user.displayName;

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
 * Manages the login for a user, if they are not logged in prompt for a log in.
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
 */
export function signOut() {
  firebase.auth().signOut();
  document.location = "/#/login";
}

/** 
 * Gets a user's Google profile name
 * @returns username
 */
export function getUserName() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      const userName = firebase.auth().currentUser.displayName;
      if (userName === null) {
        return "NO USERNAME";
      } else {
        console.log(userName);
        return userName;
      }
    } else {
      promptForLogin();
    }
  });
}

/** 
 * Gets a user's Google profile picture
 * @returns link
 */
export function getUserName() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      return firebase.auth().currentUser.photoURL;
    } else {
      promptForLogin();
    }
  });
}
