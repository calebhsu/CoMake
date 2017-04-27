/**
* @file Defines a function that creates and sends a request to the ModelImportService
*/

const https = require('https');

/**
* Constructs and sends a request to the ModelImportService
* @param {string} modelId An modelId string for the ModelImportService
* @param {function} resCallback A function that will be passed the server's response
* @throws Exceptions on invalid parameter types
* @returns {void}
*/
const getRequest = (modelId, resCallback) => {
  if (typeof modelId !== 'string')
    throw 'Error forming request to import model ID. Invalid modelId param, must be a String.';

  const req = https.request({
    host: 'craftml-io.firebaseio.com',
    path: '/docs/' + modelId + '/images/default.json',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: false
  }, (res) => {
    var resObj = null;

    res.on('data', (bodyPiece) => {
      if(!resObj)
        resObj = bodyPiece;
      else
        resObj += bodyPiece;
    });

    res.on('end', () => {
      if (res.statusCode === 200) {
        resCallback(resObj);
      }
      else {
        console.error('Error code returned from ModelImportService. Code: %d',
          res.statusCode
        );
        throw { message: 'Error code returned from ModelImportService' };
      }
    });
  });

  req.on('error', (error) => {
    console.error('Error sending request for model %s. Error is below.', modelId);
    console.log(error);
    throw error;
  });

  req.end();
};

module.exports = {
  getRequest
};
