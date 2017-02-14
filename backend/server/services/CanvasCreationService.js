/**
 * @file Defines the CanvasCreationService
 */

const admin = require('firebase-admin');
const winston = require('winston');

const userHelper = require('../helpers/userHelper');

/**
 * Creates a new canvas based on a CanvasCreationService request
 * @param {ExpressRequest} request An express request object representing the request
 * @param {ExpressResponse} response An express response object representing the response
 * @returns {void}
 */
const handleRequest = (request, response) => {
 winston.info('CanvasCreationService.handleRequest - handling a new request: %j', request.body);

 let newCanvasId = null;

 try {
   const newCanvasRef = admin.database().ref('/canvases').push();
   newCanvasId = newCanvasRef.key;

   winston.info('CanvasCreationService.handleRequest - creating a new canvas with id %s', newCanvasId);

   //configure the relevant fields on the new canvas
   newCanvasRef.set({
       items: [],
       name: request.body.name,
       owner: request.body.creatingUser,
       teacher: request.body.teacher,
   }).then(() => {
     winston.info('CanvasCreationService.handleRequest - adding users to new canvas %s', newCanvasId);

     // add the creating user to the canvas
     userHelper.addUserToCanvasByUid(request.body.creatingUser, newCanvasId);

     // add the teacher to the canvas (if specified)
     if(request.body.teacher)
       userHelper.addUserToCanvasByUid(request.body.teacher, newCanvasId);

     // add the users in the user list to the canvas
     request.body.userList.forEach((userEmail) => {
       userHelper.addUserToCanvasByEmail(userEmail, newCanvasId)
     });

     winston.info('CanvasCreationService.handleRequest - successfully created canvas %s, sending response to client', newCanvasId);

     // send the new canvas id to the requesting user
     response.send({ newCanvasId });

   }).catch((error) => {
     winston.error('CanvasCreationService.handleRequest - error creating canvas %s: %s', newCanvasId, error.message);

     response.status(500).send('Error creating canvas.');
   });
 } catch (error) {
   winston.error('CanvasCreationService.handleRequest - error creating canvas %s: %s', newCanvasId, error.message);

   response.status(500).send('Error creating canvas.');
 }
};

module.exports = {
handleRequest,
};

/*
Example CanvasCreationService Request:
{
  name: <canvas-name>,
  creatingUser: <uid>,
  teacher: <null or uid>,
  userList: <object containing a list of emails>
}
*/
