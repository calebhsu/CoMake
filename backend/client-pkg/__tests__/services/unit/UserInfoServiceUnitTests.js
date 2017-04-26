/**
 * @file Integration tests for the UserInfoService client package
 */
const UserInfoService = require('../../../services/UserInfoService');

describe('UserInfoServiceUnitTests', () => {
  test('formRequest_success', () => {
    const uid = '0'

    const expectedRequest = {
       uid,
    }

    const actualRequest = UserInfoService.formRequestBody(uid);

    expect(actualRequest).toEqual(expectedRequest);
  });

  test('formRequest_uidInvalid_exception', () => {
    const uid = 2;

    try {
      UserInfoService.formRequestBody(uid);
    } catch(err) {
      expect(err).toEqual('UserInfoService.formRequestBody - invalid uid param, must be a String');
    }
  });
});