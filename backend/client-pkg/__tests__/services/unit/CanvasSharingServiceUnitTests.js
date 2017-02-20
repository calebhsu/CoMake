/**
 * @file Integration tests for the CanvasSharingService client package
 */
const CanvasSharingService = require('../../../services/CanvasSharingService');

describe('CanvasSharingServiceUnitTests', () => {
  test('formRequest_success', () => {
    const canvasId = 'canvas-id';
    const sharingUser = 'sharing-user';
    const userList = ['testing', 'testing2']

    const expectedRequest = {
       canvasId,
       sharingUser,
       userList,
    }

    const actualRequest = CanvasSharingService.formRequestBody(canvasId, sharingUser, userList);

    expect(actualRequest).toEqual(expectedRequest);
  });

  test('formRequest_nameInvalid_exception', () => {
    const canvasId = 1;
    const sharingUser = 'sharing-user';
    const userList = ['testing', 'testing2']

    try {
      CanvasSharingService.formRequestBody(canvasId, sharingUser, userList);
    } catch(err) {
      expect(err).toEqual('CanvasSharingService.formRequestBody - invalid canvasId param, must be a String');
    }
  });

  test('formRequest_creatingUserInvalid_exception', () => {
    const canvasId = 'canvas-id';
    const sharingUser = true;
    const userList = ['testing', 'testing2']

    try {
      CanvasSharingService.formRequestBody(canvasId, sharingUser, userList);
    } catch(err) {
      expect(err).toEqual('CanvasSharingService.formRequestBody - invalid sharingUser param, must be a String');
    }
  });

  test('formRequest_userListInvalid_exception', () => {
    const canvasId = 'canvas-id';
    const sharingUser = 'sharing-user';
    const userList = 'hello'

    try {
      CanvasSharingService.formRequestBody(canvasId, sharingUser, userList);
    } catch(err) {
      expect(err).toEqual('CanvasSharingService.formRequestBody - invalid userList param, must be an Array');
    }
  });
});