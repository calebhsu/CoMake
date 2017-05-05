/**
* @file Defines a function that creates and sends a request to the UserInfoService
*/

const USR_INFO_SVC_ROUTE = require('../common/Constants').USR_INFO_SVC_ROUTE;
const PostRequestHelper = require('../common/PostRequestHelper');

/**
* Forms the body of a POST request  to the UserInfoService
* @param {string} uid The uid of the user to add
* @throws Exceptions on invalid parameter types
* @returns {object} A POST request body that can be sent to the UserInfoService
*/
const formPostBody = (uid) => {
  if(typeof uid !== 'string')
    throw 'Error forming request to create user. Invalid uid param, must be a String.'

  return {
    uid,
  }
};

/**
* Constructs and sends a request to the UserInfoService
* @param {object} reqBody An object containing the POST request body
* @param {object} endpoint An object containing the endpoint to send the req to
* @param {function} resCallback A callback that will be passed the JSON object of the request response
* @returns {void}
*/
const postRequest = (reqBody, endpoint, resCallback, errCallback) => {
  PostRequestHelper.postRequest(reqBody, endpoint,
    USR_INFO_SVC_ROUTE, resCallback, errCallback);
};

module.exports = {
  formPostBody,
  postRequest,
};
