/**
 * @file Defines the CanvasSharingService
 */

const admin = require('firebase-admin');
const cors = require('cors')({ origin: ["http://localhost:8888",
  "https://comake-95cb7.firebaseapp.com"] });

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
    if(!request.body.canvasId || typeof request.body.canvasId !== "string") {
      response.status(500).send({ message: 'Invalid canvasId param.' });
      return;
    }

    if(!request.body.sharingUser || typeof request.body.sharingUser !== "string") {
      response.status(500).send({ message: 'Invalid sharingUser param.' });
      return;
    }

    if(!request.body.userList || !(request.body.userList instanceof Array)) {
      response.status(500).send({ message: 'Invalid userList param.' });
      return;
    }

    console.info(
      'Handling valid request by user %s to share canvas %s with users [%s]',
      request.body.sharingUser,
      request.body.canvasId,
      request.body.userList.toString()
    );

    try {
      const canvasUsersRef = admin.database()
        .ref('/canvases/' + request.body.canvasId + '/users');

      canvasUsersRef.once('value').then((canvasUsersSnap) => {

        const usersAdded = [];
        const usersNotFound = [];
        const addUserPromises = [];

        const canvasUsersList = canvasUsersSnap.val();

        if(canvasUsersList && canvasUsersList[request.body.sharingUser]) {
          // add the users in the user list to the canvas
          request.body.userList.forEach((userEmail) => {
            addUserPromises.push(
              UserHelper.addUserToCanvasByEmail(userEmail, request.body.canvasId)
                .then(() => {
                  usersAdded.push(userEmail);
                }).catch((error) => {
                  if(error === Errors.UserNotFound)
                    usersNotFound.push(userEmail);
                  else
                    throw error;
                })
              );
          });

          admin.Promise.all(addUserPromises).then(() => {
            // send the new canvas id to the requesting user
            response.send({
              sharedCanvasId: request.body.canvasId,
              usersAdded,
              usersNotFound
            });
          });
        } else {
          response.status(500)
            .send({ message: 'Users cannot change canvases they are not assigned to.' });
        }
      });
   } catch (error) {
     // catch any errors that might have occurred
     console.error(
       'Error when user %s shared canvas %s with users [%s]: %s',
       request.body.sharingUser,
       request.body.canvasId,
       request.body.userList.toString(),
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
