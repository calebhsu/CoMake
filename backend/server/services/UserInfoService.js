/**
 * @file Defines the UserInfoService
 */

const admin = require('firebase-admin');
const cors = require('cors')({origin: ["http://localhost:8888", "https://comake-95cb7.firebaseapp.com"]});

/**
 * Creates a new canvas based on a UserInfoService request
 * @param {ExpressRequest} request An express request object representing the request
 * @param {ExpressResponse} response An express response object representing the response
 * @returns {void}
 */
const handleCorsRequest = (request, response) => {
  cors(request, response, () => {
    if(typeof request.body.uid !== "string") {
      response.status(500).send({ message: 'Invalid uid param.' });
      return;
    }

    try {
      admin.auth().getUser(request.body.uid).then((userRecord) => {
        let message = "";
        admin.database().ref('/users/' + request.body.uid)
          .transaction((oldValue) => {
            if(oldValue)
              message = "user info already existed, overwriting"
            else
              message = "new user info saved"

            let providerData = [];
            userRecord.providerData.forEach((singleProvData) => {
              providerData.push({
                displayName: singleProvData.displayName ? singleProvData.displayName : null,
                email: singleProvData.email ? singleProvData.email : null,
                photoURL: singleProvData.photoURL ? singleProvData.photoURL : null,
                providerId: singleProvData.providerId ? singleProvData.providerId : null,
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
          }).catch((error) => {
            throw error;
          });
        }).catch((error) => {
          throw error;
        });
    } catch (error) {
      response.status(500).send({ message: 'Error adding user info.' });
    }
  });
};

module.exports = {
  handleCorsRequest
};

/*
Example UserInfoService Request:
{
  uid: <uid>
}
*/
