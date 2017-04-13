const functions = require('firebase-functions');
const admin = require('firebase-admin');

const CanvasCreationService = require('./services/CanvasCreationService');
const CanvasSharingService = require('./services/CanvasSharingService');
const UserInfoService = require('./services/UserInfoService');

admin.initializeApp(functions.config().firebase);

exports.CanvasCreationService = functions.https.onRequest(CanvasCreationService.handleCorsRequest);

exports.CanvasSharingService = functions.https.onRequest(CanvasSharingService.handleCorsRequest);

exports.UserInfoService = functions.https.onRequest(UserInfoService.handleCorsRequest);
