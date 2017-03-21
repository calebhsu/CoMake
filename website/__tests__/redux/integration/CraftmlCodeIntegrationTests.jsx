/**
 * @file Integration test for CraftMl Code Redux work flow.
 */

import storeHelper from '../../../src/redux/storeHelper';
import * as CodeActions from '../../../src/redux/actions/CraftmlCodeActions';
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

  test('updateCode_dispatch', (done) => {
    const expectedCode = 'some code here';
    testStore.subscribe(() => {
      expect(testStore.getState().craftmlCodeReducer[RC.CODE])
        .toEqual(expectedCode);
      done();
    });
    testStore.dispatch(CodeActions.setCode(expectedCode));
  });

  test('toggleAutoUpdate_dispatch_toTrue', (done) => {
    testStore.subscribe(() => {
      expect(testStore.getState().craftmlCodeReducer[RC.AUTO_GENERATE_CODE])
        .toEqual(true);
      done();
    });
    testStore.dispatch(CodeActions.toggleAutoCodeUpdate());
  })

  test('toggleAutoUpdate_dispatch_toFalse', (done) => {
    testStore.dispatch(CodeActions.toggleAutoCodeUpdate());
    testStore.subscribe(() => {
      expect(testStore.getState().craftmlCodeReducer[RC.AUTO_GENERATE_CODE])
        .toEqual(false);
      done();
    });
    testStore.dispatch(CodeActions.toggleAutoCodeUpdate());
  })
});
