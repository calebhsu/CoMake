/**
 * @file Automated tests for the Redux positions reducer (redux/reducers/positionsReducer).
 */

import {
  LoginReducer
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
    const testAction = {
      type: AC.UPDATE_USER_INFO,
      payload: {
        name: testName;
        photo: testPhotoURL;
      },
    }
    userInfoReducer(RC.BLANK_STATE, testAction);
    expect(ReducerUtil.insertIntoState).toHaveBeenCalledWith(RC.BLANK_STATE,
      testName, [RC.USER_INFO, RC.USERNAME]);
    expect(ReducerUtil.insertIntoState).toHaveBeenCalledWith(RC.BLANK_STATE,
      testPhotoURL, [RC.USER_INFO, RC.USER_PHOTO_URL]);
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
