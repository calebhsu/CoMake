/**
* @file Defines a function that creates and sends a request to the ModelImportService
*/

const http = require('http');

const MDL_IMPT_SVC_ROUTE = require('../Constants.js').MDL_IMPT_SVC_ROUTE;

/**
* Forms the body of a proper request to the ModelImportService
* @param {string} modelId The id of the model image to import
* @throws Exceptions on invalid parameter types
* @returns {object} An object that can be sent as the body of a request to the ModelImportService
*/
const formRequestBody = (modelId) => {
  if(typeof modelId !== String)
    throw 'ModelImportService.formRequestBody - invalid modelId param, must be a String'

  return { modelId }
};

/**
* Constructs and sends a request to the ModelImportService
* @param {object} requestBody An object containing a properly formatted request for the ModelImportService (see formRequestBody)
* @param {object} endpoint An object containing information about the endpoint to send the request to
* @param {function} responseCallback A function that will be passed the JSON object of the server's response
* @returns {void}
*/
const sendRequest = (requestBody, endpoint, responseCallback) => {
  // header is updated in the server side code
  const request = http.request({
    host: 'https://craftml-io.firebaseio.com/docs/BKWPq/images/default.json',
    port: endpoint.port || 80,
    path: MDL_IMPT_SVC_ROUTE,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  }, (res) => {
    console.log(res);
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
          'ModelImportService.sendRequest - error handling ModelImportService response: '
            + error.message
        );
        throw error;
      }
    });
  });

  request.on('error', (error) => {
    console.log(
      'ModelImportService.sendRequest - error sending ModelImportService request: '
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
