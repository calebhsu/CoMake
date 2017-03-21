/**
 * @file Integration test for CraftMl Code Redux work flow.
 */

import storeHelper from '../../../src/redux/storeHelper';
import * as CodeActions from '../../../src/redux/actions/CraftmlCodeActions';
import * as RC from '../../../src/redux/reducers/ReducerConstants';

describe('CraftmlCodeIntegrationTests', () => {

  let testStore = null;

  // create a new store before each test
  beforeEach(() => {
    testStore = storeHelper.constructStore();
  });

  // delete the old store after each test
  afterEach(() => {
    testStore = null;
  });

  test('updateCode_dispatch', (done) => {
    const expectedCode = 'some code here';
    testStore.subscribe(() => {
      expect(testStore.getState().craftmlCodeReducer[RC.CODE])
        .toEqual(expectedCode);
      done();
    });
    testStore.dispatch(CodeActions.setCode(expectedCode));
  });

  test('setAutoUpdate_dispatch_toTrue', (done) => {
    testStore.subscribe(() => {
      expect(testStore.getState().craftmlCodeReducer[RC.AUTO_GENERATE_CODE])
        .toEqual(true);
      done();
    });
    testStore.dispatch(CodeActions.setAutoCodeUpdate(true));
  })
});
