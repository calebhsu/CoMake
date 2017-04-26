/**
 * @file Integration tests for the CanvasSharingService client package
 */

const firebase = require('firebase');

const CanvasSharingService = require('../../../services/CanvasSharingService');
const firebaseUtils = require('../../../firebaseUtils');

describe('CanvasSharingServiceIntegrationTests', () => {

  const test_endpoint = {
    host: 'comakeserver.herokuapp.com'
  };

  let firebaseApp = null;

  beforeAll(() => {
    firebaseApp = firebaseUtils.initFirebase();
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  });

  test('sendRequest_requestReturns', (done) => {

    const requestBody = CanvasSharingService.formRequestBody(
      '-Kd6yNDP3HKNhaiD1BTu',
      '0',
      [
        'ih4t3myp4r3nts@angstyteen.com',
        'thisisawkward@iwanttoleave.com'
      ]
    );

    CanvasSharingService.sendRequest(requestBody, test_endpoint, (resObj) => {
      const canvasRef = firebase.database().ref('/canvases/' + resObj.sharedCanvasId);
      canvasRef.once('value').then((canvasSnap) => {
        expect(canvasSnap.val()).toBeTruthy();
        expect(canvasSnap.child('users/1').val()).toBeTruthy();
        expect(canvasSnap.child('users/2').val()).toBeTruthy();
        canvasRef.child('users').set({ 0: 'smuggler4lyfe@milfalc.com' }).then(() => {
          done();
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
