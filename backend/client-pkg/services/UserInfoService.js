/**
* @file Defines a function that creates and sends a request to the UserInfoService
*/

const https = require('https');

const USR_INFO_SVC_ROUTE = require('../Constants.js').USR_INFO_SVC_ROUTE;

/**
* Forms the body of a proper request  to the UserInfoService
* @param {string} uid The uid of the user to add
* @throws Exceptions on invalid parameter types
* @returns {object} An object that can be sent as the body of a request to the UserInfoService
*/
const formRequestBody = (uid) => {
  if(typeof uid !== "string")
    throw 'UserInfoService.formRequestBody - invalid uid param, must be a String'

  return {
    uid,
  }
};

/**
* Constructs and sends a request to the UserInfoService
* @param {object} requestBody An object containing a properly formatted request for the UserInfoService (see formRequestBody)
* @param {object} endpoint An object containing information about the endpoint to send the request to
* @param {function} responseCallback A function that will be passed the JSON object of the server's response
* @returns {void}
*/
const sendRequest = (requestBody, endpoint, responseCallback) => {
  // TODO: can remove withCredentials: false once the access control allow origin
  // header is updated in the server side code
  const request = https.request({
    host: endpoint.host,
    path: USR_INFO_SVC_ROUTE,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: false
  }, (res) => {
    let responseObject = null;

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
          'UserInfoService.sendRequest - error handling UserInfoService response: '
            + error.message
        );
        throw error;
      }
    });
  });

  request.on('error', (error) => {
    console.log(
      'UserInfoService.sendRequest - error sending UserInfoService request: '
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
