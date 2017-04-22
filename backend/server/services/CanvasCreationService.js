/**
 * @file Defines the CanvasCreationService
 */

const admin = require('firebase-admin');
const cors = require('cors')({origin: ["http://localhost:8888", "https://comake-95cb7.firebaseapp.com"]});

const UserHelper = require('../helpers/UserHelper');

/**
 * Creates a new canvas based on a CanvasCreationService request
 * @param {ExpressRequest} request An express request object representing the request
 * @param {ExpressResponse} response An express response object representing the response
 * @returns {void}
 */
const handleCorsRequest = (request, response) => {
  cors(request, response, () => {

   if(typeof request.body.name !== "string") {
      response.status(500).send({ message: 'Invalid name param.' });
      return;
   }

   if(typeof request.body.creatingUser !== "string") {
     response.status(500).send({ message: 'Invalid creatingUser param.' });
     return;
   }

   if(!(request.body.userList instanceof Array)) {
     response.status(500).send({ message: 'Invalid userList param.' });
     return;
   }

   try {
     const newCanvasRef = admin.database().ref('/canvases').push();
     const newCanvasId = newCanvasRef.key;

     //configure the relevant fields on the new canvas
     newCanvasRef.set({
         items: [],
         name: request.body.name,
         owner: request.body.creatingUser,
     }).then(() => {

       const addUserPromises = [];

       // add the creating user to the canvas
       addUserPromises.concat(
         UserHelper.addUserToCanvasByUid(request.body.creatingUser, newCanvasId)
       );

       // add the users in the user list to the canvas
       request.body.userList.forEach((userEmail) => {
         addUserPromises.push(
           UserHelper.addUserToCanvasByEmail(userEmail, newCanvasId)
         );
       });

       admin.Promise.all(addUserPromises).then(() => {
         // send the new canvas id to the requesting user
         response.send({ newCanvasId });
       }).catch((error) => {
         throw error;
       });

     }).catch((error) => {
       throw error;
     });
   } catch (error) {
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
  name: <canvas-name>,
  creatingUser: <uid>,
  userList: <object containing a list of emails>
}
*/
