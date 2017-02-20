/**
 * @file Integration tests for the CanvasCreationService client package
 */

const firebase = require('firebase');

const CanvasCreationService = require('../../../services/CanvasCreationService');
const firebaseUtils = require('../../../firebase-utils');

describe('CanvasCreationServiceIntegrationTests', () => {

  const test_user = {
    email: 'test@test.com',
    password: 'testing123'
  }

  const test_endpoint = {
    host: 'comakeserver.herokuapp.com'
  };

  let firebaseApp = null;

  beforeAll(() => {
    firebaseApp = firebaseUtils.initFirebase();
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  });

  test('sendRequest_requestReturns', (done) => {

    const requestBody = CanvasCreationService.formRequestBody('hello', "0", "1", ["chhs9974@colorado.edu", "chialo.hsu@gmail.com"]);

    CanvasCreationService.sendRequest(requestBody, test_endpoint, (resObj) => {
      firebase.database().ref('/canvases/' + resObj.newCanvasId).once('value')
      .then((newCanvasSnap) => {
        expect(newCanvasSnap.val()).toBeTruthy();
        done();
      }).catch((err) => {
        throw err;
      });
    });
  });

  afterAll(() => {
    firebaseApp.delete();
  });
});
