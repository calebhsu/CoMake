/**
 * @file Automated tests for the Redux positions reducer (redux/reducers/positionsReducer).
 */

import {
  userInfoReducer
} from '../../../../src/redux/reducers/LoginReducer';
import * as RC from '../../../../src/redux/reducers/ReducerConstants';
import * as AC from '../../../../src/redux/actions/ActionConstants';
import * as ReducerUtil from '../../../../src/redux/reducers/ReducerUtil';

describe('LoginReducerUnitTests', () => {

  beforeEach(() => {
    spyOn(ReducerUtil, 'insertIntoState');
  });

  test('userInfoReducer_UpdateUserInfo', () => {
    const testId = 'uid';
    const testName = 'First Last';
    const testPhotoURL = "photoURL";
    const testEmail = "email";
    const testPayload = {};
    testPayload[RC.USER_ID] = testId;
    testPayload[RC.USERNAME] = testName;
    testPayload[RC.USER_PHOTO_URL] = testPhotoURL;
    testPayload[RC.USER_EMAIL] = testEmail;
    const testAction = {
      type: AC.UPDATE_USER_INFO,
      payload: testPayload,
    }
    userInfoReducer(RC.BLANK_STATE, testAction);
    expect(ReducerUtil.insertIntoState).toHaveBeenCalledWith(RC.BLANK_STATE,
      testAction.payload, [RC.USER_INFO]);
  });

  test('userInfoReducer_NotSupportedAction', () => {
    const testAction = {
      type: 'NotSupported',
      payload: 'something',
    }
    expect(userInfoReducer(RC.BLANK_STATE, testAction))
      .toEqual(RC.BLANK_STATE);
  });
});
