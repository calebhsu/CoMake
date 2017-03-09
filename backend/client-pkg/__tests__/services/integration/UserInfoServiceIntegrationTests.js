/**
 * @file Integration tests for the UserInfoService client package
 */

const firebase = require('firebase');

const UserInfoService = require('../../../services/UserInfoService');
const firebaseUtils = require('../../../firebaseUtils');

describe('UserInfoServiceIntegrationTests', () => {

  const test_endpoint = {
    host: 'comakeserver.herokuapp.com',
  };

  let firebaseApp = null;

  beforeAll(() => {
    firebaseApp = firebaseUtils.initFirebase();
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  });

  test('sendRequest_requestReturns', (done) => {

    const requestBody = UserInfoService.formRequestBody(
      'EvdmVcxJ84Px0ZBAS7SQAUAlTFn1'
    );

    UserInfoService.sendRequest(requestBody, test_endpoint, () => {
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
