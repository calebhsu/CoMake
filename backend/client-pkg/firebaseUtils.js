/**
 * @file File to contain commonly used firebase functions/utilities
 */

const firebase = require('firebase');

/**
 * Initializes the firebase app
 * @returns {FirebaseApp} A firebase app object initialized with the CoMake project
 */
const initFirebase = () => {
  // start code from console.firebase.google.com
  const config = {
    apiKey: 'AIzaSyBouGOzw_GYXTl9_hkHhL2WZYvh1NHoQM0',
    authDomain: 'comake-95cb7.firebaseapp.com',
    databaseURL: 'https://comake-95cb7.firebaseio.com',
    storageBucket: 'comake-95cb7.appspot.com',
    messagingSenderId: '578562241026',
  };
  return firebase.initializeApp(config);
  // end sourced code
};

module.exports = {
  initFirebase,
};
