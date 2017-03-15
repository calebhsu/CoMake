/**
 * @file Integration tests for the CanvasSharingService client package
 */
const ModelImportService = require('../../../services/ModelImportService');

describe('ModelImportServiceUnitTests', () => {
  test('sendRequest_nameInvalid_exception', () => {
    const modelId = 92315;

    try {
      ModelImportService.sendRequest(modelId);
    } catch(err) {
      expect(err).toEqual('ModelImportService.sendRequest - invalid modelId param, must be a string');
    }
  });
});
