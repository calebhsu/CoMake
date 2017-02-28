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

  test('updateUserInfo_dispatch', (done) => {
    const testName = 'First Last';
    const testPhotoURL = 'photoURL';
    const expected = Object.assign({}, RC.BLANK_STATE);
    expected[RC.USER_INFO][RC.USERNAME] = testName;
    expected[RC.USER_INFO][RC.USER_PHOTO_URL] = testPhotoURL;
    testStore.subscribe(() => {
      expect(testStore.getState().LoginReducer).toEqual(expected);
      done();
    });

    testStore.dispatch(LoginActions.updateUserInfo(testName, testPhotoURL));
  });
});
