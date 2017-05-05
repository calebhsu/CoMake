/**
* @file Defines a function that creates and sends a request to the CanvasCreationService
*/

const CNVS_CRTN_SVC_ROUTE = require('../common/Constants').CNVS_CRTN_SVC_ROUTE;
const PostRequestHelper = require('../common/PostRequestHelper');

/**
* Forms the body of a POST request  to the CanvasCreationService
* @param {string} creatingUser The uid of the user making the request
* @throws Exceptions on invalid parameter types
* @returns {object} A POST request body that can be sent to the CanvasCreationService
*/
const formPostBody = (creatingUser) => {
  if(typeof creatingUser !== 'string')
    throw 'Error forming request to create canvas. Invalid creatingUser param, must be a String.'

  return {
    creatingUser,
  }
};

/**
* Constructs and sends a request to the CanvasCreationService
* @param {object} reqBody An object containing the POST request body
* @param {object} endpoint An object containing the endpoint to send the req to
* @param {function} resCallback A callback that will be passed the JSON object of the request response
* @returns {void}
*/
const postRequest = (reqBody, endpoint, resCallback, errCallback) => {
  PostRequestHelper.postRequest(reqBody, endpoint,
    CNVS_CRTN_SVC_ROUTE, resCallback, errCallback);
};

module.exports = {
  formPostBody,
  postRequest,
};
