/**
 * @file Exports all of the services for the client package.
 */

const CanvasCreationService = require('./services/CanvasCreationService');
const CanvasSharingService = require('./services/CanvasSharingService');
const LoginService = require('./services/LoginService');

module.exports = {
  CanvasCreationService,
  CanvasSharingService,
  LoginService
};
