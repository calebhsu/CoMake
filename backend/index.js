const express = require('express');
const fs = require('file-system');
const http = require('http');
const admin = require('firebase-admin');

const app = express();

/* For when HTTPS is implemented
const privKey = fs.readFileSync('serverFiles/comakeKey.pem', 'utf8');
const privKeyPassphrase = fs.readFileSync('serverFiles/comakeKeyPassphrase.txt', 'utf8');
const certificate = fs.readFileSync('serverFiles/comakeCert.pem', 'utf8');
const creds = { key: privKey, passphrase: privKeyPassphrase, cert: certificate };
*/

admin.initializeApp({
  credential: admin.credential.cert('./serverFiles/comake-95cb7-firebase-adminsdk-rx9ym-ab77d95612.json'),
  databaseURL: 'https://comake-95cb7.firebaseio.com',
});

app.post('/', (req, res) => {
  admin.database().ref('/hello_service').set(Math.random());

  res.set('Access-Control-Allow-Origin', '*');

  res.send('Hello there!');
});

const server = http.createServer(app);

server.listen(8443);
