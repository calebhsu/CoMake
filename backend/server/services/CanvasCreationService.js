/**
 * @file Defines the Canvas Creation Service
 */

// TODO: User list

 const admin = require('firebase-admin');
 const winston = require('winston');

 const handleRequest = (request, response) => {
   winston.info('CanvasCreationService - handling a new request: %j', request.body);

   const newCanvasRef = admin.database().ref('/canvases').push();
   const canvasId = newCanvasRef.key;

   const userList = {};
   userList[request.body.creatingUser] = 'test';

   winston.info('CanvasCreationService - creating a new canvas with id %s', canvasId);

   try {
     newCanvasRef.set({
         items: [],
         name: request.body.name,
         owner: request.body.creatingUser,
         teacher: request.body.teacher,
         users: userList
     }).then(() => {
       winston.info('CanvasCreationService - responding to request to create canvas %s', canvasId);

       response.send({
         canvasId,
       });
     }).catch((error) => {
       winston.error('CanvasCreationService - error creating canvas %s: %s', canvasId, error.message);

       response.status(500).send('Error creating canvas.');
     });
   } catch (error) {
     winston.error('CanvasCreationService - error creating canvas %s: %s', canvasId, error.message);

     response.status(500).send('Error creating canvas.');
   }
 };

module.exports = {
  handleRequest,
};

/*
Example Request:
{
  name: <canvas-name>,
  creatingUser: <uid>,
  teacher: <null or uid>
}
*/
