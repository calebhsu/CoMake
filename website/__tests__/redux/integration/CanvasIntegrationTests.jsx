/**
 * @file Integration test for Canvas Redux work flow.
 */

import storeHelper from '../../../src/redux/storeHelper';
import * as CA from '../../../src/redux/actions/CanvasActions';
import * as RC from '../../../src/redux/reducers/ReducerConstants';

describe('CanvasIntegrationTests', () => {

  let testStore = null;

  // create a new store before each test
  beforeEach(() => {
    testStore = storeHelper.constructStore();
  });

  // delete the old store after each test
  afterEach(() => {
    testStore = null;
  });

  test('addCanvas_dispatch', (done) => {
    const testId = 'testId';
    const testInfo = 'testInfo';
    const expected = Object.assign({}, RC.BLANK_STATE);
    expected[RC.CANVASES][testId] = testInfo;

    testStore.subscribe(() => {
      expect(testStore.getState().canvasReducer).toEqual(expected);
      done();
    });

    testStore.dispatch(CA.addCanvas(testId, testInfo));
  });

  test('addCanvasUser_dispatch', (done) => {
    const testId = 'testId';
    const testUserId = 'testUserId';
    const testUserInfo = {'testname': 'nameHere'};
    const expected = Object.assign({}, RC.BLANK_STATE);
    expected[RC.CANVASES][testId] = {}
    expected[RC.CANVASES][testId][RC.CANVAS_USERS] = {};
    expected[RC.CANVASES][testId][RC.CANVAS_USERS][testUserId] = testUserInfo;

    testStore.subscribe(() => {
      expect(testStore.getState().canvasReducer).toEqual(expected);
      done();
    });

    testStore.dispatch(CA.addCanvasUser(testId, testUserId, testUserInfo));
  });

  test('removeCanvasUser_dispatch', (done) => {
    const testId = 'testId';
    const testUserId = 'testUserId';
    const testUserInfo = {'testname': 'nameHere'};
    const testState = Object.assign({}, RC.BLANK_STATE);
    testState[RC.CANVASES][testId] = {}
    testState[RC.CANVASES][testId][RC.CANVAS_USERS] = {};
    testState[RC.CANVASES][testId][RC.CANVAS_USERS][testUserId] = testUserInfo;

    testStore.subscribe(() => {
      expect(testStore.getState()
        .canvasReducer[RC.CANVASES][testId][RC.CANVAS_USERS]).toEqual({});
      done();
    });

  testStore.dispatch(CA.removeCanvasUser(testId, testUserId));
  });

  test('removeCanvas_dispatch', (done) => {
    const testId = 'testId';
    const testInfo = 'testInfo';
    const expected = Object.assign({}, RC.BLANK_STATE);
    expected[RC.CANVASES] = {};
    testStore.dispatch(CA.addCanvas(testId, testInfo));

    testStore.subscribe(() => {
      expect(testStore.getState().canvasReducer).toEqual(expected);
      done();
    });

    testStore.dispatch(CA.removeCanvas(testId));
  });

  test('setCurrentCanvas_dispatch', (done) => {
    const testId = 'testId';
    const expected = Object.assign({}, RC.BLANK_STATE);
    expected[RC.CURRENT_CANVAS] = testId;

    testStore.subscribe(() => {
      expect(testStore.getState().canvasReducer).toEqual(expected);
      done();
    });

    testStore.dispatch(CA.setCurrentCanvas(testId));
  });

  test('setCanvasName_dispatch', (done) => {
    const testId = 'testId';
    const testName = 'testName';
    const expected = Object.assign({}, RC.BLANK_STATE);
    expected[RC.CANVASES][testId][RC.CANVAS_NAME] = testName;

    testStore.subscribe(() => {
      expect(testStore.getState().canvasReducer).toEqual(expected);
      done();
    });

    testStore.dispatch(CA.setCanvasName(testId, testName));
  });

  test('setCanvasOrientation_dispatch', (done) => {
    const testId = 'testId';
    const testOrientation = 'side';
    const expected = Object.assign({}, RC.BLANK_STATE);
    expected[RC.CANVASES][testId][RC.CANVAS_ORIENTATION] = testOrientation;

    testStore.subscribe(() => {
      expect(testStore.getState().canvasReducer).toEqual(expected);
      done();
    });

    testStore.dispatch(CA.setCanvasOrientation(testId, testOrientation));
  });

  test('setCanvasOwner_dispatch', (done) => {
    const testId = 'testId';
    const testOwner = 'testOwner';
    const expected = Object.assign({}, RC.BLANK_STATE);
    expected[RC.CANVASES][testId][RC.CANVAS_OWNER] = testOwner;

    testStore.subscribe(() => {
      expect(testStore.getState().canvasReducer).toEqual(expected);
      done();
    });

    testStore.dispatch(CA.setCanvasOwner(testId, testOwner));
  });
});
