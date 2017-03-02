/**
 * @file Automated tests for the Redux positions reducer (redux/reducers/positionsReducer).
 */

import {
  currentCanvasReducer
} from '../../../../src/redux/reducers/CurrentCanvasReducer';
import * as RC from '../../../../src/redux/reducers/ReducerConstants';
import * as AC from '../../../../src/redux/actions/ActionConstants';
import * as ReducerUtil from '../../../../src/redux/reducers/ReducerUtil';

describe('ElementReducerUnitTests', () => {

  beforeEach(() => {
    spyOn(ReducerUtil, 'insertIntoState');
  });

  test('currentCanvasReducer_TargetElement', () => {
    const testId = 'testId';
    const testAction = {
      type: AC.TARGET_ELEMENT,
      payload: testId,
    }
    currentCanvasReducer(RC.BLANK_STATE, testAction);
    expect(ReducerUtil.insertIntoState).toHaveBeenCalledWith(RC.BLANK_STATE,
      testId, [RC.CURRENT_CANVAS, RC.CANVAS_ACTIVE_ELEMENT]);
  });

  test('currentCanvasReducer_NotSupportedAction', () => {
    const testAction = {
      type: 'NotSupported',
      payload: 'something',
    }
    expect(currentCanvasReducer(RC.BLANK_STATE, testAction))
      .toEqual(RC.BLANK_STATE);
  });

  test('currentCanvasReducer_DeletedTargetElement', () => {
    const elemId = 'testId';
    const dummyState = {}
    dummyState[RC.CURRENT_CANVAS] = {};
    dummyState[RC.CURRENT_CANVAS][RC.CANVAS_ACTIVE_ELEMENT] = elemId;
    const testAction = {
      type: AC.REMOVE_ELEMENT,
      elementId: elemId,
    };
    currentCanvasReducer(dummyState, testAction);
    expect(ReducerUtil.insertIntoState).toHaveBeenCalledWith(dummyState, null,
      [RC.CURRENT_CANVAS, RC.CANVAS_ACTIVE_ELEMENT])
  });
});
