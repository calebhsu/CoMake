/**
 * @file Starts up an http server and listens for requests.
 */

const express = require('express');
const http = require('http');
const admin = require('firebase-admin');
const bodyParser = require('body-parser');
const winston = require('winston');

const CanvasCreationService = require('./services/CanvasCreationService');
const CanvasSharingService = require('./services/CanvasSharingService');
const UserInfoService = require('./services/UserInfoService');

const CNVS_CRTN_SVC_ROUTE = '/CreateCanvasService';
const CNVS_SHARE_SVC_ROUTE = '/ShareCanvasService';
const USR_INFO_SVC_ROUTE = '/UserInfoService';

const port = process.env.PORT || 8080;

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
  credential: admin.credential.cert('./security/comake-95cb7-firebase-adminsdk-rx9ym-87eb287556.json'),
  databaseURL: 'https://comake-95cb7.firebaseio.com',
});
winston.info('firebase init complete');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  // TODO: Once we have deployed and know our site domain, change this
  // to increase security
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  next();
});

winston.info('started assigning routes to services');
app.post(CNVS_CRTN_SVC_ROUTE, CanvasCreationService.handleRequest);
app.post(CNVS_SHARE_SVC_ROUTE, CanvasSharingService.handleRequest);
app.post(USR_INFO_SVC_ROUTE, UserInfoService.handleRequest);


winston.info('finished assigning routes to services');

// create server and listen on port
http.createServer(app).listen(port);
