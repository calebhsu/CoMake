/**
 * @file Starts up an http server and listens for requests.
 */

const express = require('express');
const http = require('http');
const admin = require('firebase-admin');

const app = express();

/* For when HTTPS is implemented
const privKey = fs.readFileSync('./security/comakeKey.pem', 'utf8');
const privKeyPassphrase = fs.readFileSync('./security/comakeKeyPassphrase.txt', 'utf8');
const certificate = fs.readFileSync('./security/comakeCert.pem', 'utf8');
const creds = { key: privKey, passphrase: privKeyPassphrase, cert: certificate };
*/

// initialize firebase
admin.initializeApp({
  credential: admin.credential.cert('./security/comake-95cb7-firebase-adminsdk-rx9ym-ab77d95612.json'),
  databaseURL: 'https://comake-95cb7.firebaseio.com',
});

// create server and listen on port
http.createServer(app).listen(8443);
