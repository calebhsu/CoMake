/**
 * @file Automated tests for the Redux active element..
 */

import {
  activeElementReducer
} from '../../../../src/redux/reducers/ActiveElementReducer';
import * as RC from '../../../../src/redux/reducers/ReducerConstants';
import * as AC from '../../../../src/redux/actions/ActionConstants';
import * as ReducerUtil from '../../../../src/redux/reducers/ReducerUtil';

describe('ElementReducerUnitTests', () => {

  beforeEach(() => {
    spyOn(ReducerUtil, 'insertIntoState');
  });

  test('activeElementReducer_TargetElement', () => {
    const testId = 'testId';
    const testAction = {
      type: AC.TARGET_ELEMENT,
      payload: testId,
    }
    activeElementReducer(RC.BLANK_STATE, testAction);
    expect(ReducerUtil.insertIntoState).toHaveBeenCalledWith(RC.BLANK_STATE,
      testId, [RC.ACTIVE_ELEMENT]);
  });

  test('activeElementReducer_NotSupportedAction', () => {
    const testAction = {
      type: 'NotSupported',
      payload: 'something',
    }
    expect(activeElementReducer(RC.BLANK_STATE, testAction))
      .toEqual(RC.BLANK_STATE);
  });

  test('activeElementReducer_DeletedTargetElement', () => {
    const elemId = 'testId';
    const dummyState = {}
    dummyState[RC.ACTIVE_ELEMENT] = elemId;
    const testAction = {
      type: AC.REMOVE_ELEMENT,
      elementId: elemId,
    };
    activeElementReducer(dummyState, testAction);
    expect(ReducerUtil.insertIntoState).toHaveBeenCalledWith(dummyState, null,
      [RC.ACTIVE_ELEMENT])
  });
});
