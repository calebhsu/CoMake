/**
 * @file Starts up an http server and listens for requests.
 */

const express = require('express');
const http = require('http');
const admin = require('firebase-admin');
const bodyParser = require('body-parser');
const winston = require('winston');

const CanvasCreationService = require('./services/CanvasCreationService');

const CNVS_CRTN_SVC_ROUTE = '/CreateCanvasService';

const date = new Date();
const month = date.getUTCMonth() + 1;
const day = date.getUTCDate();
const year = date.getUTCFullYear();
winston.configure({
  transports: [new (winston.transports.File)(
    { filename: 'comake-backend_' + month + '_' + day + '_' +
       year + '.log' }
  )]
});

// initialize firebase
winston.info('firebase init start');
admin.initializeApp({
  credential: admin.credential.cert('./security/CoMake-2731d99717ce.json'),
  databaseURL: 'https://comake-95cb7.firebaseio.com',
});
winston.info('firebase init complete');

const app = express();

app.use(bodyParser.json());

winston.info('started assigning routes to services');
app.post(CNVS_CRTN_SVC_ROUTE, CanvasCreationService.handleRequest);

winston.info('finished assigning routes to services');

// create server and listen on port
http.createServer(app).listen(8443);
