/**
 * @file Integration tests for the LoginService client package
 */
const LoginService = require('../../../services/LoginService');

describe('LoginServiceUnitTests', () => {
  test('formRequest_success', () => {
    const uid = '0'

    const expectedRequest = {
       uid,
    }

    const actualRequest = LoginService.formRequestBody(uid);

    expect(actualRequest).toEqual(expectedRequest);
  });

  test('formRequest_uidInvalid_exception', () => {
    const uid = 2;

    try {
      LoginService.formRequestBody(uid);
    } catch(err) {
      expect(err).toEqual('LoginService.formRequestBody - invalid uid param, must be a String');
    }
  });
});