/**
 * @file Defines a function that creates and sends a request to the CanvasCreationService
 */

 const http = require('http');

 const CNVS_CRTN_SVC_ROUTE = '/CreateCanvasService';

/**
 * Forms the body of a proper request  to the CanvasCreationService
 * @param {string} name The requested name of the canvas
 * @param {string} creatingUser The uid of the user making the request
 * @param {null|string} teacher The uid of the teacher for the requested canvas
 * @param {string[]} userList An array of emails of users to be added to the grid
 * @returns {object} An object that can be sent as the body of a request to the CanvasCreationService
 */
 const formRequestBody = (name, creatingUser, teacher, userList) => ({
    name,
    creatingUser,
    teacher,
    userList,
 });

/**
 * Constructs and sends a request to the CanvasCreationService
 * @param {object} requestBody An object containing a properly formatted request for the CanvasCreationService (see formRequestBody)
 * @param {object} endpoint An object containing information about the endpoint to send the request to
 * @param {function} responseCallback A function that will be passed the JSON object of the server's response
 * @returns {void}
 */
 const sendRequest = (requestBody, endpoint, responseCallback) => {
   const request = http.request({
     host: endpoint.host,
     port: endpoint.port,
     path: CNVS_CRTN_SVC_ROUTE,
     method: 'POST',
     headers: {
       'Content-Type': 'application/json'
     }
   }, (res) => {
     let responseObject;

     res.setEncoding('utf8');
     res.on('data', (bodyChunk) => {
       if(!responseObject)
         responseObject = bodyChunk;
       else
         responseObject += bodyChunk;
     });

     res.on('end', () => {
       try {
         responseCallback(JSON.parse(responseObject));
       } catch (error) {
         console.log('CanvasCreationService.sendRequest - error handling CanvasCreationService response: ' + error.message)
       }
     });
   });

   request.on('error', (error) => {
     console.log('CanvasCreationService.sendRequest - error sending CanvasCreationService request: ' + error.message)
   });

   request.write(JSON.stringify(requestBody));
   request.end();
 };

 module.exports = {
   formRequestBody,
   sendRequest,
 };
