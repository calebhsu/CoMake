/**
 * @file Integration test for clearing the canvas
 */

import storeHelper from '../../../src/redux/storeHelper';
import * as CA from '../../../src/redux/actions/ClearActions';
import * as RC from '../../../src/redux/reducers/ReducerConstants';

describe('ClearIntegrationTests', () => {

  const blankStoreState = {};
  blankStoreState[RC.LOGIN_REDUCER] = {};
  blankStoreState[RC.CANVAS_REDUCER] = {};
  blankStoreState[RC.ELEMENT_REDUCER] = {};
  blankStoreState[RC.ACTIVE_ELEMENT_REDUCER] = {};
  blankStoreState[RC.CRAFTML_CODE_REDUCER] = {};

  const userInfoBranch = {};
  userInfoBranch[RC.USER_ID] = null;
  userInfoBranch[RC.USERNAME] = null;
  userInfoBranch[RC.USER_PHOTO_URL] = null;
  userInfoBranch[RC.USER_EMAIL] = null;

  blankStoreState[RC.LOGIN_REDUCER][RC.USER_INFO] = userInfoBranch;
  blankStoreState[RC.CANVAS_REDUCER][RC.CANVASES] = {};
  blankStoreState[RC.ELEMENT_REDUCER][RC.ELEMENTS] = {};
  blankStoreState[RC.ACTIVE_ELEMENT_REDUCER][RC.ACTIVE_ELEMENT] = null;
  blankStoreState[RC.CRAFTML_CODE_REDUCER][RC.CODE] = '';
  blankStoreState[RC.CRAFTML_CODE_REDUCER][RC.AUTO_GENERATE_CODE] = false;

  const existingState = Object.assign({}, blankStoreState);
  existingState[RC.LOGIN_REDUCER] = {};
  existingState[RC.CANVAS_REDUCER] = {};
  existingState[RC.ELEMENT_REDUCER] = {};
  existingState[RC.ACTIVE_ELEMENT_REDUCER] = {};
  existingState[RC.CRAFTML_CODE_REDUCER] = {};

  const existingUserInfoBranch = {};
  existingUserInfoBranch[RC.USER_ID] = 'test';
  existingUserInfoBranch[RC.USERNAME] = null;
  existingUserInfoBranch[RC.USER_PHOTO_URL] = null;
  existingUserInfoBranch[RC.USER_EMAIL] = null;

  existingState[RC.LOGIN_REDUCER][RC.USER_INFO] = userInfoBranch;
  existingState[RC.CANVAS_REDUCER][RC.CANVASES] = {'test': 'test'};
  existingState[RC.ELEMENT_REDUCER][RC.ELEMENTS] = {'test': 'test'};
  existingState[RC.ACTIVE_ELEMENT_REDUCER][RC.ACTIVE_ELEMENT] = 'test';
  existingState[RC.CRAFTML_CODE_REDUCER][RC.CODE] = 'test';
  existingState[RC.CRAFTML_CODE_REDUCER][RC.AUTO_GENERATE_CODE] = true;

  let testStore = null;

  beforeEach(() => {
    testStore = storeHelper.constructStore(false, existingState);
  });

  afterEach(() => {
    testStore = null;
  });

  test('clear_state', (done) => {
    expect(testStore.getState()).not.toEqual(blankStoreState);

    testStore.subscribe(() => {
      expect(testStore.getState()).toEqual(blankStoreState);
      done();
    });

    testStore.dispatch(CA.clear());
  });
});
