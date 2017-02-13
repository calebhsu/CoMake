/**
 * @file Integration tests for the CanvasCreationService client package
 */
const CanvasCreationService = require('../../../services/CanvasCreationService');

describe('CanvasCreationServiceIntegrationTests.', () => {

  const test_endpoint = {
    host: 'localhost',
    port: 8443
  };

  test('sendRequest_successfulRequest', (done) => {
    const requestBody = CanvasCreationService.formRequestBody('hello', '0', '1', []);

    CanvasCreationService.sendRequest(requestBody, test_endpoint, () => {
      done();
    });
  });
});