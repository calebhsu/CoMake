/**
* @file Defines a function that creates and sends a request to the CanvasCreationService
*/

const http = require('http');

const CNVS_CRTN_SVC_ROUTE = require('../Constants.js').CNVS_CRTN_SVC_ROUTE;

/**
* Forms the body of a proper request  to the CanvasCreationService
* @param {string} name The requested name of the canvas
* @param {string} creatingUser The uid of the user making the request
* @param {string[]} userList An array of emails of users to be added to the grid
* @throws Exceptions on invalid parameter types
* @returns {object} An object that can be sent as the body of a request to the CanvasCreationService
*/
const formRequestBody = (name, creatingUser, userList) => {
  if(typeof name !== "string")
    throw 'CanvasCreationService.formRequestBody - invalid name param, must be a String'

  if(typeof creatingUser !== "string")
    throw 'CanvasCreationService.formRequestBody - invalid creatingUser param, must be a String'

  if(!(userList instanceof Array))
    throw 'CanvasCreationService.formRequestBody - invalid userList param, must be an Array'

  return {
    name,
    creatingUser,
    userList,
  }
};

/**
* Constructs and sends a request to the CanvasCreationService
* @param {object} requestBody An object containing a properly formatted request for the CanvasCreationService (see formRequestBody)
* @param {object} endpoint An object containing information about the endpoint to send the request to
* @param {function} responseCallback A function that will be passed the JSON object of the server's response
* @returns {void}
*/
const sendRequest = (requestBody, endpoint, responseCallback) => {
  // TODO: can remove withCredentials: false once the access control allow origin
  // header is updated in the server side code
  const request = http.request({
    host: endpoint.host,
    port: endpoint.port || 80,
    path: CNVS_CRTN_SVC_ROUTE,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: false
  }, (res) => {
    var responseObject = null;

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
        console.log(
          'CanvasCreationService.sendRequest - error handling CanvasCreationService response: '
            + error.message
        );
        throw error;
      }
    });
  });

  request.on('error', (error) => {
    console.log(
      'CanvasCreationService.sendRequest - error sending CanvasCreationService request: '
        + error.message
    );
    throw error;
  });

  request.write(JSON.stringify(requestBody));
  request.end();
};

module.exports = {
  formRequestBody,
  sendRequest,
};
