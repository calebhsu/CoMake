/**
 * @file Exports all of the services for the client package.
 */

const CanvasCreationService = require('./services/CanvasCreationService');
const CanvasSharingService = require('./services/CanvasSharingService');

module.exports = {
  CanvasCreationService,
  CanvasSharingService
};
