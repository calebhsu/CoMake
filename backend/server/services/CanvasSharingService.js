/**
 * @file Defines the CanvasSharingService
 */

const admin = require('firebase-admin');
const winston = require('winston');

const UserHelper = require('../helpers/UserHelper');

/**
 * Shares a canvas based on a CanvasSharingService request
 * @param {ExpressRequest} request An express request object representing the request
 * @param {ExpressResponse} response An express response object representing the response
 * @returns {void}
 */
const handleRequest = (request, response) => {
  winston.info(
    'CanvasSharingService.handleRequest - handling a new request: %j',
    request.body);

  if(request.body.canvasId.constructor !== String) {
    winston.error(
      'CanvasSharingService.handleRequest - invalid canvasId param, must be a String'
    );
    return;
  }

  if(request.body.sharingUser.constructor !== String) {
    winston.error(
      'CanvasSharingService.handleRequest - invalid sharingUser param, must be a String'
    );
    return;
  }

  if(!(request.body.userList instanceof Array)) {
    winston.error(
      'CanvasSharingService.handleRequest - invalid userList param, must be an Array'
    );
    return;
  }

  try {
    const canvasUsersRef = admin.database()
      .ref('/canvases/' + request.body.canvasId + '/users');

    canvasUsersRef.once('value').then((canvasUsersSnap) => {

      if(canvasUsersSnap.val() && canvasUsersSnap.val()[request.body.sharingUser]) {
        // add the users in the user list to the canvas
        request.body.userList.forEach((userEmail) => {
        UserHelper.addUserToCanvasByEmail(userEmail, request.body.canvasId)
        });

        winston.info(
          'CanvasSharingService.handleRequest - successfully shared canvas %s with users',
          request.body.canvasId
        );

        // send the new canvas id to the requesting user
        response.send({ sharedCanvasId: request.body.canvasId });
      } else {
        winston.error(
          'CanvasSharingService.handleRequest - user %s is not on canvas %s and cannot share it',
          request.body.canvasId
        );

        response.status(500)
          .send('Users cannot change canvases they are not assigned to.');
      }

    }).catch((error) => {
      winston.error(
        'CanvasSharingService.handleRequest - error sharing canvas %s: %s',
        request.body.canvasId,
        error.message
      );

      response.status(500).send({ message: 'Error sharing canvas.' });
    });
 } catch (error) {
   winston.error(
     'CanvasSharingService.handleRequest - error sharing canvas %s: %s',
     request.body.canvasId,
     error.message
   );

   response.status(500).send({ message: 'Error sharing canvas.' });
 }
};

module.exports = {
handleRequest,
};

/*
Example CanvasSharingService Request:
{
  canvasId: <canvas-id>,
  sharingUser: <uid>,
  userList: <object containing a list of emails>
}
*/
