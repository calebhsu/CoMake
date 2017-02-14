/**
 * @file Defines a helper for common user actions
 */

 const admin = require('firebase-admin');
 const winston = require('winston');

 /**
  * Looks up a firebase user by their email
  * @param {string} email the email of the user to lookup
  * @returns {Promise} A promise that contains a Firebase DataSnapshot with the relevant user
  */
 const getFirebaseUserByEmail = (email) => {
   winston.info('userHelper.getFirebaseUserByEmail - looking up user with email %s', email);

   try {
     const usersRef = admin.database().ref('/users');
     return usersRef.orderByChild('email').equalTo(email).limitToFirst(1)
      .once('child_added').catch((error) => {
        winston.error('userHelper.getFirebaseUserByEmail - Error looking up user by email %s. Error message: %s', email, error.message);
      });
    }
    catch (error) {
      winston.error('userHelper.getFirebaseUserByEmail - Error looking up user by email %s. Error message: %s', email, error.message);
    }
 };

 /**
  * Adds a user specified by email to the canvas designated by canvasId
  * @param {string} email the email of the user to add the the canvas
  * @param {string} canvasId the canvas id of the canvas to add the user to
  * @returns {void}
  */
 const addUserToCanvasByEmail = (email, canvasId) => {
  winston.info('userHelper.addUserToCanvasByEmail - adding user %s to canvas %s', email, canvasId);

  try {
    getFirebaseUserByEmail(email).then((userSnap) => {
      const canvasRef = admin.database().ref('/canvases/' + canvasId);

      // add user to the canvas's user list
      canvasRef.child('/users').transaction((oldValue) => {
          winston.info('userHelper.addUserToCanvasByEmail - writing user %s to canvas %s', email, canvasId);
          if(!oldValue)
            oldValue = {};
          oldValue[userSnap.key] = userSnap.child('email').val();
          return oldValue;
        }).then(() => {
          winston.info('userHelper.addUserToCanvasByEmail - successfully added user %s to canvas %s', email, canvasId);
        }).catch((error) => {
          winston.error('userHelper.addUserToCanvasByEmail - error adding user %s to canvas %s: %s', email, canvasId, error.message);
        });

      // add canvas to the user's canvas list
      canvasRef.child('name').once('value').then((canvasNameSnap) => {
        console.log(canvasNameSnap.val());
        admin.database().ref('/users/' + userSnap.key + '/canvases').transaction((oldValue) => {
          winston.info('userHelper.addUserToCanvasByEmail - writing canvas %s to user %s', canvasId, email);

          if(!oldValue)
            oldValue = {};
          oldValue[canvasId] = canvasNameSnap.val();
          return oldValue;
        }).then(() => {
          winston.info('userHelper.addUserToCanvasByEmail - successfully added canvas %s to user %s', canvasId, email);
        }).catch((error) => {
          winston.error('userHelper.addUserToCanvasByEmail - error adding canvas %s to user %s: %s', canvasId, email, error.message);
        });
      });
    });
  } catch (error) {
    winston.error('userHelper.addUserToCanvasByEmail - error adding user %s to canvas %s or vice versa: %s', email, canvasId, error.message);
  }
 };

 /**
  * Adds a user specified by uid to the canvas designated by canvasId
  * @param {string} uid the user id of the user to add the the canvas
  * @param {string} canvasId the canvas id of the canvas to add the user to
  * @returns {void}
  */
  const addUserToCanvasByUid = (uid, canvasId) => {
   winston.info('userHelper.addUserToCanvasByUid - adding user %s to canvas %s', uid, canvasId);

   try {

    const userRef = admin.database().ref('/users/' + uid);
    const canvasRef = admin.database().ref('/canvases/' + canvasId);

    userRef.once('value').then((userSnap) => {
        canvasRef.child('users').transaction((oldValue) => {
           winston.info('userHelper.addUserToCanvasByUid - writing user %s to canvas %s', userSnap.key, canvasId);
           if(!oldValue)
             oldValue = {};
           oldValue[userSnap.key] = userSnap.child('email').val();
           return oldValue;
         }).then(() => {
           winston.info('userHelper.addUserToCanvasByUid - successfully added user %s to canvas %s', uid, canvasId);
         }).catch((error) => {
           winston.error('userHelper.addUserToCanvasByUid - error adding user %s to canvas %s: %s', uid, canvasId, error.message);
         });
     });

     // add canvas to the user's canvas list
     canvasRef.child('name').once('value').then((canvasNameSnap) => {
       userRef.child('canvases').transaction((oldValue) => {
         winston.info('userHelper.addUserToCanvasByUid - writing canvas %s to user %s', canvasId, uid);

         if(!oldValue)
           oldValue = {};
         oldValue[canvasId] = canvasNameSnap.val();
         return oldValue;
       }).then(() => {
         winston.info('userHelper.addUserToCanvasByUid - successfully added canvas %s to user %s', canvasId, uid);
       }).catch((error) => {
         winston.error('userHelper.addUserToCanvasByUid - error adding canvas %s to user %s: %s', canvasId, uid, error.message);
       });
     });
   } catch (error) {
     winston.error('userHelper.addUserToCanvasByUid - error adding user %s to canvas %s or vice versa: %s', uid, canvasId, error.message);
   }
  };

module.exports = {
  getFirebaseUserByEmail,
  addUserToCanvasByEmail,
  addUserToCanvasByUid
};
