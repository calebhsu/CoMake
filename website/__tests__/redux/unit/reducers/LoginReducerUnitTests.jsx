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
    const testName = 'First Last';
    const testPhotoURL = 'photoURL';
    const testEmail = 'email';
    const testAction = {
      type: AC.UPDATE_USER_INFO,
      payload: {
        name: testName,
        photo: testPhotoURL,
        email: testEmail,
      },
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
