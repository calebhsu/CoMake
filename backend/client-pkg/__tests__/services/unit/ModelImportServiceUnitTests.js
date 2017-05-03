/**
 * @file Integration tests for the CanvasSharingService client package
 */
const ModelImportService = require('../../../services/ModelImportService');

describe('ModelImportServiceUnitTests', () => {
  test('sendRequest_nameInvalid_exception', () => {
    const modelId = 92315;

    try {
      ModelImportService.getRequest(modelId);
    } catch(err) {
      expect(err).toEqual('Error forming request to import model ID. Invalid modelId param, must be a String.');
    }
  });
});
