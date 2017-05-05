/**
* @file Defines a function that creates and sends a request to the CanvasSharingService
*/

const CNVS_SHARE_SVC_ROUTE = require('../common/Constants').CNVS_SHARE_SVC_ROUTE;
const PostRequestHelper = require('../common/PostRequestHelper');

/**
* Forms the body of a POST request to the CanvasSharingService
* @param {string} canvasId The id of the canvas to share
* @param {string} sharingUser The uid of the user making the request
* @param {string[]} userList An array of emails of users to be added to the grid
* @throws Exceptions on invalid parameter types
* @returns {object} A POST request body that can be sent to the CanvasSharingService
*/
const formPostBody = (canvasId, sharingUser, userList) => {
  if(typeof canvasId !== 'string')
    throw 'Error forming request to share canvas. Invalid canvasId param, must be a String.'

  if(typeof sharingUser !== 'string')
    throw 'Error forming request to share canvas. Invalid sharingUser param, must be a String.'

  if(!(userList instanceof Array))
    throw 'Error forming request to share canvas. Invalid userList param, must be an Array.'

  return {
    canvasId,
    sharingUser,
    userList
  }
};

/**
* Constructs and sends a request to the CanvasSharingService
* @param {object} reqBody An object containing the POST request body
* @param {object} endpoint An object containing the endpoint to send the req to
* @param {function} resCallback A callback that will be passed the JSON object of the request response
* @returns {void}
*/
const postRequest = (reqBody, endpoint, resCallback, errCallback) => {
  PostRequestHelper.postRequest(reqBody, endpoint,
    CNVS_SHARE_SVC_ROUTE, resCallback, errCallback);
};

module.exports = {
  formPostBody,
  postRequest,
};
