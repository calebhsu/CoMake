/**
 * @file Integration test for Canvas Redux work flow.
 */

import storeHelper from '../../../src/redux/storeHelper';
import {
  addCanvas, removeCanvas, setCurrentCanvas,
} from '../../../src/redux/actions/CanvasActions';
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

    testStore.dispatch(addCanvas(testId, testInfo));
  });

  test('removeCanvas_dispatch', (done) => {
    const testId = 'testId';
    const testInfo = 'testInfo';
    const expected = Object.assign({}, RC.BLANK_STATE);
    expected[RC.CANVASES] = {};
    testStore.dispatch(addCanvas(testId, testInfo));

    testStore.subscribe(() => {
      expect(testStore.getState().canvasReducer).toEqual(expected);
      done();
    });

    testStore.dispatch(removeCanvas(testId));
  });

  test('setCurrentCanvas_dispatch', (done) => {
    const testId = 'testId';
    const expected = Object.assign({}, RC.BLANK_STATE);
    expected[RC.CURRENT_CANVAS] = testId;
    
    testStore.subscribe(() => {
      expect(testStore.getState().canvasReducer).toEqual(expected);
      done();
    });

    testStore.dispatch(setCurrentCanvas(testId));
  });
});
