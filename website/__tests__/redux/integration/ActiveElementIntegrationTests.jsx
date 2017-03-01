/**
 * @file Integration test for CurrentCanvas Redux work flow.
 */

import storeHelper from '../../../src/redux/storeHelper';
import {
  targetElement
} from '../../../src/redux/actions/ActiveElementActions';
import * as ElementActions from '../../../src/redux/actions/ElementActions';
import * as RC from '../../../src/redux/reducers/ReducerConstants';

describe('ActiveElementIntegrationTests', () => {

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
    expected[RC.ACTIVE_ELEMENT] = testId;
    testStore.subscribe(() => {
      expect(testStore.getState().activeElementReducer).toEqual(expected);
      done();
    });

    testStore.dispatch(targetElement(testId));
  });

  test('removeElement_dispatchMatch', (done) => {
    // Set the active element.
    const testId = 'testId';
    testStore.dispatch(targetElement(testId));

    testStore.subscribe(() => {
      expect(testStore.getState()
        .activeElementReducer[RC.ACTIVE_ELEMENT])
        .toEqual(null);
      done();
    });
    testStore.dispatch(ElementActions.removeElement(testId));
  });
});
