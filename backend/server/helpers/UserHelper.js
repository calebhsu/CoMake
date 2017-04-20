/**
 * @file A helper for common user actions
 */

 const admin = require('firebase-admin');

 const Errors = require('./Errors');

 /**
  * Looks up a firebase user by their email
  * @param {string} email the email of the user to lookup
  * @returns {Promise} A promise that contains a Firebase DataSnapshot with the query results
  */
 const getFirebaseUserByEmail = (email) => {
  console.info(
    'UserHelper.getFirebaseUserByEmail - looking up user with email %s',
    email
  );

  const usersRef = admin.database().ref('/users');
  try {
    return usersRef.orderByChild('email').equalTo(email).limitToFirst(1)
      .once('value').catch((error) => {
        console.error(
          'UserHelper.getFirebaseUserByEmail - Error looking up user by email %s. Error message: %s',
          email,
          error.message
        );
      });
  }
  catch (error) {
    console.error(
      'UserHelper.getFirebaseUserByEmail - Error looking up user by email %s. Error message: %s',
      email,
      error.message
    );
  }
};

/**
 * Adds a user specified by email to the canvas designated by canvasId
 * @param {string} email the email of the user to add the the canvas
 * @param {string} canvasId the canvas id of the canvas to add the user to
 * @throws When user is not found in DB
 * @returns {void}
*/
const addUserToCanvasByEmail = (email, canvasId) => {
  console.info(
    'UserHelper.addUserToCanvasByEmail - adding user %s to canvas %s',
    email,
    canvasId
  );

  return getFirebaseUserByEmail(email).then((queryResultSnap) => {
    if(!(queryResultSnap.val()) || queryResultSnap.numChildren() !== 1) {
      console.info(
        'UserHelper.addUserToCanvasByEmail - no info for user %s found in the database %s',
        email
      );
      throw Errors.UserNotFound;
    }

    const canvasRef = admin.database().ref('/canvases/' + canvasId);

    queryResultSnap.forEach((userSnap) => {
      try {
        // add user to the canvas's user list
        canvasRef.child('/users').transaction((oldValue) => {
          console.info(
            'UserHelper.addUserToCanvasByEmail - writing user %s to canvas %s',
            email,
            canvasId
          );
          if(!oldValue)
            oldValue = {};
          oldValue[userSnap.key] = userSnap.child('email').val();
          return oldValue;
        }).then(() => {
          console.info(
            'UserHelper.addUserToCanvasByEmail - successfully added user %s to canvas %s',
            email,
            canvasId
          );
        }).catch((error) => {
          console.error(
            'UserHelper.addUserToCanvasByEmail - error adding user %s to canvas %s: %s',
            email,
            canvasId,
            error.message
          );
        });
      } catch (error) {
        console.error(
          'UserHelper.addUserToCanvasByEmail - error adding user %s to canvas %s: %s',
          email,
          canvasId,
          error.message
        );
      }

      try {
        // add canvas to the user's canvas list
        canvasRef.child('name').once('value').then((canvasNameSnap) => {
          admin.database().ref('/users/' + userSnap.key + '/canvases')
            .transaction((oldValue) => {
              console.info(
                'UserHelper.addUserToCanvasByEmail - writing canvas %s to user %s',
                canvasId,
                email
              );

              if(!oldValue)
                oldValue = {};
              oldValue[canvasId] = canvasNameSnap.val();
              return oldValue;
            }).then(() => {
              console.info(
                'UserHelper.addUserToCanvasByEmail - successfully added canvas %s to user %s',
                canvasId,
                email
              );
            }).catch((error) => {
              console.error(
                'UserHelper.addUserToCanvasByEmail - error adding canvas %s to user %s: %s',
                canvasId,
                email,
                error.message
              );
            });
        });
      } catch (error) {
        console.error(
          'UserHelper.addUserToCanvasByEmail - error adding canvas %s to user %s: %s',
          canvasId,
          email,
          error.message
        );
      }
    });
  });
 };

/**
 * Adds a user specified by uid to the canvas designated by canvasId
 * @param {string} uid the user id of the user to add the the canvas
 * @param {string} canvasId the canvas id of the canvas to add the user to
 * @returns {void}
*/
const addUserToCanvasByUid = (uid, canvasId) => {
  console.info(
    'UserHelper.addUserToCanvasByUid - adding user %s to canvas %s',
    uid,
    canvasId
  );

  const userRef = admin.database().ref('/users/' + uid);
  const canvasRef = admin.database().ref('/canvases/' + canvasId);

  const promises = [];

  try {
    // adding user to canvas
    promises.push(
      userRef.once('value').then((userSnap) => {
        canvasRef.child('users').transaction((oldValue) => {
          console.info(
            'UserHelper.addUserToCanvasByUid - writing user %s to canvas %s',
            userSnap.key,
            canvasId
          );

          if(!oldValue)
            oldValue = {};

          oldValue[userSnap.key] = userSnap.child('email').val();
          return oldValue;
        }).then(() => {
          console.info(
            'UserHelper.addUserToCanvasByUid - successfully added user %s to canvas %s',
            uid,
            canvasId
          );
        }).catch((error) => {
          console.error(
            'UserHelper.addUserToCanvasByUid - error adding user %s to canvas %s: %s',
            uid,
            canvasId,
            error.message
          );
        });
      })
    );
  } catch (error) {
    console.error(
      'UserHelper.addUserToCanvasByUid - error adding user %s to canvas %s: %s',
      uid,
      canvasId,
      error.message
    );
  }

  try {
    // add canvas to the user's canvas list
    promises.push(
      canvasRef.child('name').once('value').then((canvasNameSnap) => {
        userRef.child('canvases').transaction((oldValue) => {
          console.info(
            'UserHelper.addUserToCanvasByUid - writing canvas %s to user %s',
            canvasId,
            uid
          );

          if(!oldValue)
            oldValue = {};

          oldValue[canvasId] = canvasNameSnap.val();
          return oldValue;
        }).then(() => {
          console.info(
            'UserHelper.addUserToCanvasByUid - successfully added canvas %s to user %s',
            canvasId,
            uid
          );
        }).catch((error) => {
          console.error(
            'UserHelper.addUserToCanvasByUid - error adding canvas %s to user %s: %s',
            canvasId,
            uid,
            error.message
          );
        });
      })
    );
  } catch (error) {
    console.error(
      'UserHelper.addUserToCanvasByUid - error adding canvas %s to user %s: %s',
      canvasId,
      uid,
      error.message
    );
  }
};

module.exports = {
  getFirebaseUserByEmail,
  addUserToCanvasByEmail,
  addUserToCanvasByUid
};
