/**
 * @file Defines the CanvasCreationService
 */

const admin = require('firebase-admin');
const cors = require('cors')({origin: ["http://localhost:8888", "https://comake-95cb7.firebaseapp.com"]});

const UserHelper = require('../helpers/UserHelper');

const newCanvasName = 'Untitled';
const newCanvasOrientation = 'overhead';

/**
 * Creates a new canvas based on a CanvasCreationService request
 * @param {ExpressRequest} request An express request object representing the request
 * @param {ExpressResponse} response An express response object representing the response
 * @returns {void}
 */
const handleCorsRequest = (request, response) => {
  cors(request, response, () => {

   if(typeof request.body.creatingUser !== "string") {
     response.status(500).send({ message: 'Invalid creatingUser param.' });
     return;
   }

   console.info(
     'Handling valid request by user %s to create canvas',
     request.body.creatingUser
   );

   try {
     const newCanvasRef = admin.database().ref('/canvases').push();
     const newCanvasId = newCanvasRef.key;

     //configure the relevant fields on the new canvas
     newCanvasRef.set({
         name: newCanvasName,
         orientation: newCanvasOrientation,
         owner: request.body.creatingUser,
     }).then(() => {
       admin.Promise.all(
         UserHelper.addUserToCanvasByUid(request.body.creatingUser, newCanvasId)
       ).then(() => {
         console.info(
           'Successfully handled request by user %s to create canvas. Created canvas %s',
           request.body.creatingUser,
           newCanvasId
         );

         // send the new canvas id to the requesting user
         response.send({ newCanvasId });
       });

     });
   } catch (error) {
     console.error(
       'Error when creating canvas with owner %s: %s',
       request.body.creatingUser,
       error.message
     );
     response.status(500).send({ message: 'Error creating canvas.' });
   }
 });
};

module.exports = {
  handleCorsRequest
};

/*
Example CanvasCreationService Request:
{
  creatingUser: <uid>
}
*/
