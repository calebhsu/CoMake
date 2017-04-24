/**
 * @file Integration test for Login Redux work flow.
 */

import storeHelper from '../../../src/redux/storeHelper';
import * as LoginActions from '../../../src/redux/actions/LoginActions';
import * as RC from '../../../src/redux/reducers/ReducerConstants';

describe('LoginIntegrationTests', () => {

  let testStore = null;

  // create a new store before each test
  beforeEach(() => {
    testStore = storeHelper.constructStore();
  });

  // delete the old store after each test
  afterEach(() => {
    testStore = null;
  });

  test('setAuthState_dispatch', (done) => {
    const testAuthState = true;
    const expected = Object.assign({}, RC.BLANK_STATE_USER_INFO);
    expected[RC.AUTH_STATE] = testAuthState;
    testStore.subscribe(() => {
      expect(testStore.getState().userInfoReducer).toEqual(expected);
      done();
    });

    testStore.dispatch(LoginActions.setAuthState(testAuthState));
  });

  test('updateUserInfo_dispatch', (done) => {
    const testId = 'uid';
    const testName = 'First Last';
    const testPhotoURL = 'photoURL';
    const testEmail = 'email';
    const testPayload = {};
    testPayload[RC.USER_ID] = testId;
    testPayload[RC.USERNAME] = testName;
    testPayload[RC.USER_PHOTO_URL] = testPhotoURL;
    testPayload[RC.USER_EMAIL] = testEmail;
    const expected = Object.assign({}, RC.BLANK_STATE_USER_INFO);
    expected[RC.USER_INFO] = testPayload
    testStore.subscribe(() => {
      expect(testStore.getState().userInfoReducer).toEqual(expected);
      done();
    });

    testStore.dispatch(LoginActions.updateUserInfo(testPayload));
  });
});
