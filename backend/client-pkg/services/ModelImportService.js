/**
* @file Defines a function that creates and sends a request to the ModelImportService
*/

const https = require('https');

/**
* Forms the body of a proper request to the ModelImportService
* @param {string} modelId The id of the model image to import
* @throws Exceptions on invalid parameter types
* @returns {string} An string that can be used in the path of a request to the ModelImportService
*/
const formRequestBody = (modelId) => {
  if (typeof modelId !== 'string')
    throw 'ModelImportService.formRequestBody - invalid modelId param, must be a String';

  return modelId;
};

/**
* Constructs and sends a request to the ModelImportService
* @param {string} requestPath An modelId string for the ModelImportService (see formRequestBody)
* @param {function} responseCallback A function that will be passed the URL of the server's response
* @returns {void}
*/
const sendRequest = (requestPath, responseCallback) => {
  const path = '/docs/' + requestPath + '/images/default.json';

  // header is updated in the server side code
  const request = https.request({
    host: 'craftml-io.firebaseio.com',
    path: path,
    method: 'GET',
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

  request.end();
};

module.exports = {
  formRequestBody,
  sendRequest,
};
