/**
 * @file Allows users to send requests to the backend services
 */

const https = require('https');

/**
* Constructs and sends an https request
* @param {object} reqBody An object containing the POST request body
* @param {object} endpoint An object containing the endpoint to send the req to
* @param {function} path The path to direct the request to
* @param {function} resCallback A callback that will be passed the JSON object of the request response
* @returns {void}
*/
const postRequest = (reqBody, endpoint, path, resCallback) => {
  const req = https.request({
    host: endpoint.host,
    path: path,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: false
  }, (res) => {
    let resObj = null;

    res.on('data', (bodyPiece) => {
      if(!resObj)
        resObj = bodyPiece;
      else
        resObj += bodyPiece;
    });

    res.on('end', () => {
      let jsonRes = null;

      try {
        jsonRes = JSON.parse(resObj);
      } catch (err) {
        jsonRes = null;
        console.error(
          'Response object from path %s was not JSON. Error and res object are below.',
          path);
        console.error(err.message);
        console.log(resObj);
      }

      resCallback(jsonRes);
    });

  });

  req.on('error', (error) => {
    console.error('Error sending request to path %s. Error is below.', path);
    console.log(error);
    throw error;
  });

  req.write(JSON.stringify(reqBody));
  req.end();
};

module.exports = {
  postRequest
}
