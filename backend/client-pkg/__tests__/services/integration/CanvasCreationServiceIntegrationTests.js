/**
 * @file Integration tests for the CanvasCreationService client package
 */
const firebase = require('firebase');

const firebaseUtils = require('../../../firebase-utils');
const CanvasCreationService = require('../../../services/CanvasCreationService');

describe('CanvasCreationServiceIntegrationTests.', () => {

  const test_user = {
    email: 'test@test.com',
    password: 'testing123'
  }

  const test_endpoint = {
    host: 'localhost',
    port: 8443
  };

  // TODO: fix this test so it works

  function verifyNewCanvas(newCanvasBody, requestBody) {
    expect(newCanvasBody.teacher).toEqual(requestBody.teacher);
  }

  let firebaseApp = null;

  beforeAll(() => {
    firebaseApp = firebaseUtils.initFirebase();
  });

  test('sendRequest_successfulRequest', (done) => {

    const requestBody = CanvasCreationService.formRequestBody('hello', "0", "1", ["chhs9974@colorado.edu", "chialo.hsu@gmail.com"]);

    /*CanvasCreationService.sendRequest(requestBody, test_endpoint, () => {
      done();
    });*/

    firebase.auth().signInWithEmailAndPassword(test_user.email, test_user.password)
      .then((fbUser) => {
        console.log('here');
        const requestBody = CanvasCreationService.formRequestBody('hello', fbUser.uid, fbUser.uid, []);

        CanvasCreationService.sendRequest(requestBody, test_endpoint, (responseObject) => {
          firebase.database().ref('/canvases/' + responseObject.newCanvasId).once('value')
            .then((newCanvasSnap) => {
              verifyNewCanvas(newCanvasSnap.val(), requestBody);
            });
          done();
        });
      }).catch((err) => {
        console.log(err.message);
      });
  });

  afterAll(() => {
    firebase.auth().signOut();
    if(!firebaseApp)
      firebaseApp.delete()
  });
});
