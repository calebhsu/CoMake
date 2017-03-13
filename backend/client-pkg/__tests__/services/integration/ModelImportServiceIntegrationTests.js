/**
 * @file Integration tests for the ModelImportService client package
 */

const ModelImportService = require('../../../services/CanvasSharingService');

describe('ModelImportServiceIntegrationTests', () => {

  test('sendRequest_requestReturns', () => {
    const requestBody = ModelImportService.formRequestBody(
      '9dKZ3'
    );
    const expectedRequest = 'http://res.cloudinary.com/craftml/image/upload/v1489381041/9dKZ3/-Kf50m7ppARLoDtW5-kR.png'
    const requestResp = ModelImportService.sendRequest(requestBody);
    expect(requestResp).toEqual(expectedRequest);
  });

});
