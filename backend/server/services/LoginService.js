/**
 * @file Defines the LoginService
 */

const admin = require('firebase-admin');
const winston = require('winston');

/**
 * Creates a new canvas based on a LoginService request
 * @param {ExpressRequest} request An express request object representing the request
 * @param {ExpressResponse} response An express response object representing the response
 * @returns {void}
 */
const handleRequest = (request, response) => {
  winston.info(
    'LoginService.handleRequest - handling a new request: %j',
    request.body
  );

  if(typeof request.body.uid !== "string") {
    winston.error('LoginService.handleRequest - invalid uid param, must be a String');
    response.status(500)
      .send('Invalid uid param.');
    return;
  }

  try {
    admin.auth().getUser(request.body.uid)
      .then((userRecord) => {
        let message = "";
        admin.database().ref('/users/' + request.body.uid)
          .transaction((oldValue) => {
            if(oldValue)
            {
              winston.info(
                'LoginService.handleRequest - user info for user %s already saved',
                request.body.uid
              );

              message = "user info already existed, overwriting"
            } else {
              winston.info(
                'LoginService.handleRequest - user info for user %s not saved, overwriting',
                request.body.uid
              );

              message = "new user info saved"
            }

            winston.info(
              'LoginService.handleRequest - saving user info for user %s',
              request.body.uid
            );

            let providerData = [];
            userRecord.providerData.forEach((singleProvData) => {
              providerData.push({
                displayName: singleProvData.displayName ? singleProvData.displayName : null,
                email: singleProvData.email ? singleProvData.email : null,
                photoURL: singleProvData.photoURL ? singleProvData.photoURL : null,
                providerId: singleProvData.providerId,
              });
            });

            return {
              admin: false,
              canvases: null,
              createdAt: userRecord.metadata.createdAt,
              disabled: userRecord.disabled ? userRecord.disabled : null,
              displayName: userRecord.displayName ? userRecord.displayName : null,
              email: userRecord.email ? userRecord.email : null,
              emailVerified: userRecord.emailVerified,
              photoURL: userRecord.photoURL ? userRecord.photoURL : null,
              providerData
            }
          }).then(() => {
            response.send({
              savedUserId: request.body.uid,
              message
            });
          });
      }).catch((error) => {
        winston.error(
          'LoginService.handleRequest - error adding user info for user %s: %s',
          request.body.uid,
          error.message
        );

        response.status(500).send({ message: 'Error adding user info.' });
      });
  } catch (error) {
    winston.error(
      'LoginService.handleRequest - error adding user info for user %s: %s',
      request.body.uid,
      error.message
    );

    response.status(500).send({ message: 'Error adding user info.' });
  }
};

module.exports = {
handleRequest,
};

/*
Example LoginService Request:
{
  uid: <uid>
}
*/
