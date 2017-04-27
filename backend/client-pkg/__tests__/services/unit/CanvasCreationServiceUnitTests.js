/**
 * @file Integration tests for the CanvasCreationService client package
 */
const CanvasCreationService = require('../../../services/CanvasCreationService');

describe('CanvasCreationServiceUnitTests', () => {
  test('formRequest_success', () => {
    const creatingUser = 'creating-user';

    const expectedRequest = {
       creatingUser,
    }

    const actualRequest = CanvasCreationService.formPostBody(creatingUser);

    expect(actualRequest).toEqual(expectedRequest);
  });

  test('formRequest_creatingUserInvalid_exception', () => {
    const creatingUser = true;

    try {
      CanvasCreationService.formPostBody(creatingUser);
    } catch(err) {
      expect(err).toEqual('Error forming request to create canvas. Invalid creatingUser param, must be a String.');
    }
  });
});