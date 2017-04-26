/**
 * @file Automated tests for the Redux Login Actions.
 */

import * as LoginActions from '../../../../src/redux/actions/LoginActions';
import * as AC from '../../../../src/redux/actions/ActionConstants';
import * as RC from '../../../../src/redux/reducers/ReducerConstants';


describe('LoginActionsUnitTests', () => {
  test('SetAuthState', () => {
    const testAuthState = true;
    const expected = {
      type: AC.SET_AUTH_STATE,
      payload: testAuthState,
    }
    expect(LoginActions.setAuthState(testAuthState)).toEqual(expected);
  });

  test('UpdateUserInfo', () => {
    const testId = 'uid';
    const testName = 'First Last';
    const testPhotoURL = "photoURL";
    const testEmail = "email";
    const testPayload = {};
    testPayload[RC.USER_ID] = testId;
    testPayload[RC.USERNAME] = testName;
    testPayload[RC.USER_PHOTO_URL] = testPhotoURL;
    testPayload[RC.USER_EMAIL] = testEmail;
    const expected = {
      type: AC.UPDATE_USER_INFO,
      payload: testPayload,
    }
    expect(LoginActions.updateUserInfo(testPayload)).toEqual(expected);
  });
});
