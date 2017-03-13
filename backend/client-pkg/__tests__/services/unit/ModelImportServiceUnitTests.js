/**
 * @file Integration tests for the CanvasSharingService client package
 */
const ModelImportService = require('../../../services/ModelImportService');

describe('ModelImportServiceUnitTests', () => {
  test('formRequest_success', () => {
    const modelId = '9dKZ3';

    const expectedRequest = modelId;

    const actualRequest = ModelImportService.formRequestBody(modelId);

    expect(actualRequest).toEqual(expectedRequest);
  });

  test('formRequest_nameInvalid_exception', () => {
    const modelId = 92315;

    try {
      ModelImportService.formRequestBody(modelId);
    } catch(err) {
      expect(err).toEqual('ModelImportService.formRequestBody - invalid modelId param, must be a String');
    }
  });
});
