/**
 * @file Exports all of the services for the client package.
 */

const CanvasCreationService = require('./services/CanvasCreationService');
const CanvasSharingService = require('./services/CanvasSharingService');
const UserInfoService = require('./services/UserInfoService');

module.exports = {
  CanvasCreationService,
  CanvasSharingService,
  UserInfoService
};
