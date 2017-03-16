/**
 * @file Integration tests for the ModelImportService client package
 */

const ModelImportService = require('../../../services/ModelImportService');

describe('ModelImportServiceIntegrationTests', () => {

  test('sendRequest_requestReturns', () => {
    const expectedRequest = 'http://res.cloudinary.com/craftml/image/upload/v1489381041/9dKZ3/-Kf50m7ppARLoDtW5-kR.png'
    const requestResp = ModelImportService.sendRequest('9dKZ3');
    expect(requestResp).toEqual(expectedRequest);
  });

});
