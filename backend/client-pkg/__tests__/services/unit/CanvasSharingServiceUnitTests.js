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

    const actualRequest = CanvasSharingService.formPostBody(canvasId, sharingUser, userList);

    expect(actualRequest).toEqual(expectedRequest);
  });

  test('formRequest_nameInvalid_exception', () => {
    const canvasId = 1;
    const sharingUser = 'sharing-user';
    const userList = ['testing', 'testing2']

    try {
      CanvasSharingService.formPostBody(canvasId, sharingUser, userList);
    } catch(err) {
      expect(err).toEqual('Error forming request to share canvas. Invalid canvasId param, must be a String.');
    }
  });

  test('formRequest_creatingUserInvalid_exception', () => {
    const canvasId = 'canvas-id';
    const sharingUser = true;
    const userList = ['testing', 'testing2']

    try {
      CanvasSharingService.formPostBody(canvasId, sharingUser, userList);
    } catch(err) {
      expect(err).toEqual('Error forming request to share canvas. Invalid sharingUser param, must be a String.');
    }
  });

  test('formRequest_userListInvalid_exception', () => {
    const canvasId = 'canvas-id';
    const sharingUser = 'sharing-user';
    const userList = 'hello'

    try {
      CanvasSharingService.formPostBody(canvasId, sharingUser, userList);
    } catch(err) {
      expect(err).toEqual('Error forming request to share canvas. Invalid userList param, must be an Array.');
    }
  });
});