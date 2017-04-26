/**
 * @file Integration tests for the CanvasCreationService client package
 */

const firebase = require('firebase');

const CanvasCreationService = require('../../../services/CanvasCreationService');
const firebaseUtils = require('../../../firebaseUtils');

describe('CanvasCreationServiceIntegrationTests', () => {

  const test_endpoint = {
    host: 'comakeserver.herokuapp.com'
  };

  let firebaseApp = null;

  beforeAll(() => {
    firebaseApp = firebaseUtils.initFirebase();
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  });

  test('sendRequest_requestReturns', (done) => {

    const requestBody = CanvasCreationService.formRequestBody(
      'hello',
      '0',
      [
        'ih4t3myp4r3nts@angstyteen.com',
        'thisisawkward@iwanttoleave.com'
      ]
    );

    CanvasCreationService.sendRequest(requestBody, test_endpoint, (resObj) => {
      const canvasRef = firebase.database()
        .ref('/canvases/' + resObj.newCanvasId);
      canvasRef.once('value').then((newCanvasSnap) => {
        expect(newCanvasSnap.val()).toBeTruthy();
        canvasRef.set(null).then(() => {
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
