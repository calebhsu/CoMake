/**
 * @file Integration test for CurrentCanvas Redux work flow.
 */

import storeHelper from '../../../src/redux/storeHelper';
import * as CanvasActions from '../../../src/redux/actions/CurrentCanvasActions';
import * as ElementActions from '../../../src/redux/actions/ElementActions';
import * as RC from '../../../src/redux/reducers/ReducerConstants';

describe('ElementIntegrationTests', () => {

  let testStore = null;

  // create a new store before each test
  beforeEach(() => {
    testStore = storeHelper.constructStore();
  });

  // delete the old store after each test
  afterEach(() => {
    testStore = null;
  });

  test('targetElement_dispatch', (done) => {
    const testId = 'testId';
    const expected = Object.assign({}, RC.BLANK_STATE);
    expected[RC.CURRENT_CANVAS][RC.CANVAS_ACTIVE_ELEMENT] = testId;
    testStore.subscribe(() => {
      expect(testStore.getState().currentCanvasReducer).toEqual(expected);
      done();
    });

    testStore.dispatch(CanvasActions.targetElement(testId));
  });

  test('removeElement_dispatchMatch', (done) => {
    // Set the active element.
    const testId = 'testId';
    testStore.dispatch(CanvasActions.targetElement(testId));

    testStore.subscribe(() => {
      expect(testStore.getState()
        .currentCanvasReducer[RC.CURRENT_CANVAS][RC.CANVAS_ACTIVE_ELEMENT])
        .toEqual(null);
      done();
    });
    testStore.dispatch(ElementActions.removeElement(testId));
  });
});
