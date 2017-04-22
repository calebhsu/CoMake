/**
 * @file A helper for common user actions
 */

 const admin = require('firebase-admin');

 const Errors = require('./Errors');

 /**
  * Looks up a firebase user by their email
  * @param {string} email the email of the user to lookup
  * @throws Misc errors
  * @returns {Promise} A promise that contains a Firebase DataSnapshot with the query results
  */
const getFirebaseUserByEmail = (email) => {
  return admin.database().ref('/users').orderByChild('email')
    .equalTo(email).limitToFirst(1).once('value').catch((error) => {
      throw error
    });
};

/**
 * Adds a user specified by email to the canvas designated by canvasId
 * @param {string} email the email of the user to add the the canvas
 * @param {string} canvasId the canvas id of the canvas to add the user to
 * @throws When user is not found in DB, other misc errors
 * @returns {void}
*/
const addUserToCanvasByEmail = (email, canvasId) => {
  return getFirebaseUserByEmail(email).then((queryResultSnap) => {
    if(!(queryResultSnap.val()) || queryResultSnap.numChildren() !== 1) {
      throw Errors.UserNotFound;
    }

    const canvasRef = admin.database().ref('/canvases/' + canvasId);

    queryResultSnap.forEach((userSnap) => {

      const userCanvasesRef = admin.database().ref('/users/' + userSnap.key);

      try {
        // add user to the canvas's user list
        canvasRef.child('users').transaction((oldValue) => {
          if(!oldValue)
            oldValue = {};

          oldValue[userSnap.key] = userSnap.child('email').val();

          return oldValue;
        }).catch((error) => {
          throw error;
        });

        // add canvas to the user's canvas list
        canvasRef.child('name').once('value').then((canvasNameSnap) => {
          userCanvasesRef.transaction((oldValue) => {
              if(!oldValue)
                oldValue = {};

              oldValue[canvasId] = canvasNameSnap.val();

              return oldValue;
            }).catch((error) => {
              throw error;
            });
        });
      } catch (error) {
        //undo change(s)
        canvasRef.child('users/' + userSnap.key).set(null);
        userCanvasesRef.child(canvasId).set(null);
        throw error;
      }
    });
  });
 };

/**
 * Adds a user specified by uid to the canvas designated by canvasId
 * @param {string} uid the user id of the user to add the the canvas
 * @param {string} canvasId the canvas id of the canvas to add the user to
 * @throws Misc errors
 * @returns {void}
*/
const addUserToCanvasByUid = (uid, canvasId) => {

  const userRef = admin.database().ref('/users/' + uid);
  const canvasRef = admin.database().ref('/canvases/' + canvasId);

  const promises = [];

  try {
    // adding user to canvas
    promises.push(
      userRef.once('value').then((userSnap) => {
        canvasRef.child('users').transaction((oldValue) => {
          if(!oldValue)
            oldValue = {};

          oldValue[userSnap.key] = userSnap.child('email').val();

          return oldValue;
        }).catch((error) => {
          throw error;
        });
      })
    );

    // add canvas to the user's canvas list
    promises.push(
      canvasRef.child('name').once('value').then((canvasNameSnap) => {
        userRef.child('canvases').transaction((oldValue) => {
          if(!oldValue)
            oldValue = {};

          oldValue[canvasId] = canvasNameSnap.val();

          return oldValue;
        }).catch((error) => {
          throw error;
        });
      })
    );
  } catch (error) {
    //undo change(s)
    canvasRef.child('users/' + uid).set(null);
    userRef.child('canvases/' + canvasId).set(null);
    throw error;
  }

  return promises;
};

module.exports = {
  getFirebaseUserByEmail,
  addUserToCanvasByEmail,
  addUserToCanvasByUid
};
