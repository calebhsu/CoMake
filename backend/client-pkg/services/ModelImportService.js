/**
* @file Defines a function that creates and sends a request to the ModelImportService
*/

const https = require('https');

/**
* Constructs and sends a request to the ModelImportService
* @param {string} modelId An modelId string for the ModelImportService
* @param {function} responseCallback A function that will be passed the server's response
* @returns {void}
*/
const sendRequest = (modelId, responseCallback) => {
  if (typeof modelId !== 'string')
    throw 'ModelImportService.sendRequest - invalid modelId param, must be a string';

  const path = '/docs/' + modelId + '/images/default.json';

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
    var response = null;

    res.on('data', (bodyChunk) => {
      if(!response)
        response = bodyChunk;
      else
        response += bodyChunk;
    });

    res.on('end', () => {
      try {
        if (response.includes('error')) {
          responseCallback(JSON.parse(response));
        }
        else {
          responseCallback(response);
        }
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

module.exports = { sendRequest };
