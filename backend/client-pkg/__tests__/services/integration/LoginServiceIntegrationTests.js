/**
 * @file Integration tests for the LoginService client package
 */

const firebase = require('firebase');

const LoginService = require('../../../services/LoginService');
const firebaseUtils = require('../../../firebaseUtils');

describe('LoginServiceIntegrationTests', () => {

  const test_endpoint = {
    host: 'comakeserver.herokuapp.com',
  };

  let firebaseApp = null;

  beforeAll(() => {
    firebaseApp = firebaseUtils.initFirebase();
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  });

  test('sendRequest_requestReturns', (done) => {

    const requestBody = LoginService.formRequestBody(
      'EvdmVcxJ84Px0ZBAS7SQAUAlTFn1'
    );

    LoginService.sendRequest(requestBody, test_endpoint, () => {
      const userRef = firebase.database()
        .ref('/users/EvdmVcxJ84Px0ZBAS7SQAUAlTFn1');
      userRef.once('value').then((userSnap) => {
        expect(userSnap.val()).toBeTruthy();
        userRef.set(null).then(() => {
          done();
        }).catch((error) => {
          throw error
        });
      }).catch((err) => {
        throw err;
      });
    });
  });

  afterAll(() => {
    firebaseApp.delete();
  });
});
