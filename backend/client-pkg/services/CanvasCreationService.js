/**
* @file Defines a function that creates and sends a request to the CanvasCreationService
*/

const CNVS_CRTN_SVC_ROUTE = require('../common/Constants.js').CNVS_CRTN_SVC_ROUTE;
const PostRequestHelper = require('../common/PostRequestHelper.js');

/**
* Forms the body of a POST request  to the CanvasCreationService
* @param {string} name The requested name of the canvas
* @param {string} creatingUser The uid of the user making the request
* @param {string[]} userList An array of emails of users to be added to the grid
* @throws Exceptions on invalid parameter types
* @returns {object} A POST request body that can be sent to the CanvasCreationService
*/
const formPostBody = (name, creatingUser, userList) => {
  if(typeof name !== 'string')
    throw 'Error forming request to create canvas. Invalid name param, must be a String.'

  if(typeof creatingUser !== 'string')
    throw 'Error forming request to create canvas. Invalid creatingUser param, must be a String.'

  if(!(userList instanceof Array))
    throw 'Error forming request to create canvas. Invalid userList param, must be an Array.'

  return {
    name,
    creatingUser,
    userList,
  }
};

/**
* Constructs and sends a request to the CanvasCreationService
* @param {object} reqBody An object containing the POST request body
* @param {object} endpoint An object containing the endpoint to send the req to
* @param {function} resCallback A callback that will be passed the JSON object of the request response
* @returns {void}
*/
const postRequest = (reqBody, endpoint, resCallback) => {
  PostRequestHelper.postRequest(reqBody, endpoint, CNVS_CRTN_SVC_ROUTE, resCallback);
};

module.exports = {
  formPostBody,
  postRequest,
};
