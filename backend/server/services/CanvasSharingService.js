/**
 * @file Defines the CanvasSharingService
 */

const admin = require('firebase-admin');
const cors = require('cors')({origin: true});

const Errors = require('../helpers/Errors');
const UserHelper = require('../helpers/UserHelper');

/**
 * Shares a canvas based on a CanvasSharingService request
 * @param {ExpressRequest} request An express request object representing the request
 * @param {ExpressResponse} response An express response object representing the response
 * @returns {void}
 */
const handleCorsRequest = (request, response) => {
  cors(request, response, () => {
    console.info(
      'CanvasSharingService.handleRequest - handling a new request: %j',
      request.body);

    if(!request.body.canvasId || typeof request.body.canvasId !== "string") {
      console.error(
        'CanvasSharingService.handleRequest - invalid canvasId param, must be a String'
      );
      response.status(500)
        .send('Invalid canvasId param.');
      return;
    }

    if(!request.body.sharingUser || typeof request.body.sharingUser !== "string") {
      console.error(
        'CanvasSharingService.handleRequest - invalid sharingUser param, must be a String'
      );
      response.status(500)
        .send('Invalid sharingUser param.');
      return;
    }

    if(!request.body.userList || !(request.body.userList instanceof Array)) {
      console.error(
        'CanvasSharingService.handleRequest - invalid userList param, must be an Array'
      );
      response.status(500)
        .send('Invalid userList param.');
      return;
    }

    try {
      const canvasUsersRef = admin.database()
        .ref('/canvases/' + request.body.canvasId + '/users');

      canvasUsersRef.once('value').then((canvasUsersSnap) => {

        const usersNotFound = [];
        const addUserPromises = [];

        if(canvasUsersSnap.val() && canvasUsersSnap.val()[request.body.sharingUser]) {
          // add the users in the user list to the canvas
          request.body.userList.forEach((userEmail) => {
            addUserPromises.push(
              UserHelper.addUserToCanvasByEmail(userEmail, request.body.canvasId)
                .catch((error) => {
                  if(error === Errors.UserNotFound) {
                    usersNotFound.push(userEmail);
                  }
                  else {
                    console.error(
                      'CanvasSharingService.handleRequest - unknown error in UserHelper.addUserToCanvasByEmail when adding user %s: %s',
                      userEmail,
                      error.message
                    );
                  }
                })
              );
          });

          admin.Promise.all(addUserPromises).then(() => {
            console.info(
              'CanvasSharingService.handleRequest - completed canvas share with users for canvas %s',
              request.body.canvasId
            );

            // send the new canvas id to the requesting user
            response.send({
              sharedCanvasId: request.body.canvasId,
              usersNotFound
            });
          });
        } else {
          console.error(
            'CanvasSharingService.handleRequest - user %s is not on canvas %s and cannot share it',
            request.body.canvasId
          );

          response.status(500)
            .send({ message: 'Users cannot change canvases they are not assigned to.' });
        }

      }).catch((error) => {
        console.error(
          'CanvasSharingService.handleRequest - error sharing canvas %s: %s',
          request.body.canvasId,
          error.message
        );

        response.status(500).send({ message: 'Error sharing canvas.' });
      });
   } catch (error) {
     console.error(
       'CanvasSharingService.handleRequest - error sharing canvas %s: %s',
       request.body.canvasId,
       error.message
     );

     response.status(500).send({ message: 'Error sharing canvas.' });
   }
  });
};

module.exports = {
handleCorsRequest
};

/*
Example CanvasSharingService Request:
{
  canvasId: <canvas-id>,
  sharingUser: <uid>,
  userList: <object containing a list of emails>
}
*/
