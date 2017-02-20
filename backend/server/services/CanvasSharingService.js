/**
 * @file Defines the CanvasSharingService
 */

const admin = require('firebase-admin');
const winston = require('winston');

const userHelper = require('../helpers/userHelper');

/**
 * Creates a new canvas based on a CanvasSharingService request
 * @param {ExpressRequest} request An express request object representing the request
 * @param {ExpressResponse} response An express response object representing the response
 * @returns {void}
 */
const handleRequest = (request, response) => {
 winston.info('CanvasSharingService.handleRequest - handling a new request: %j', request.body);

 if(request.body.name.constructor !== String)
 {
    winston.error('CanvasSharingService.handleRequest - invalid name param, must be a String');
 }

 if(request.body.creatingUser.constructor !== String)
 {
   winston.error('CanvasSharingService.handleRequest - invalid creatingUser param, must be a String');
 }

 if(request.body.teacher && request.body.teacher.constructor !== String)
 {
   winston.error('CanvasSharingService.handleRequest - invalid teacher param, must be null or a String');
 }

 if(!(request.body.userList instanceof Array))
 {
   winston.error('CanvasSharingService.handleRequest - invalid userList param, must be an Array');
 }

 let newCanvasId = null;

 try {
   const newCanvasRef = admin.database().ref('/canvases').push();
   newCanvasId = newCanvasRef.key;

   winston.info('CanvasSharingService.handleRequest - creating a new canvas with id %s', newCanvasId);

   //configure the relevant fields on the new canvas
   newCanvasRef.set({
       items: [],
       name: request.body.name,
       owner: request.body.creatingUser,
       teacher: request.body.teacher,
   }).then(() => {
     winston.info('CanvasSharingService.handleRequest - adding users to new canvas %s', newCanvasId);

     // add the creating user to the canvas
     userHelper.addUserToCanvasByUid(request.body.creatingUser, newCanvasId);

     // add the teacher to the canvas (if specified)
     if(request.body.teacher)
       userHelper.addUserToCanvasByUid(request.body.teacher, newCanvasId);

     // add the users in the user list to the canvas
     request.body.userList.forEach((userEmail) => {
       userHelper.addUserToCanvasByEmail(userEmail, newCanvasId)
     });

     winston.info('CanvasSharingService.handleRequest - successfully created canvas %s, sending response to client', newCanvasId);

     // send the new canvas id to the requesting user
     response.send({ newCanvasId });

   }).catch((error) => {
     winston.error('CanvasSharingService.handleRequest - error creating canvas %s: %s', newCanvasId, error.message);

     response.status(500).send('Error creating canvas.');
   });
 } catch (error) {
   winston.error('CanvasSharingService.handleRequest - error creating canvas %s: %s', newCanvasId, error.message);

   response.status(500).send('Error creating canvas.');
 }
};

module.exports = {
handleRequest,
};

/*
Example CanvasSharingService Request:
{
  name: <canvas-name>,
  sharingUser: <uid>,
  userList: <object containing a list of emails>
}
*/
