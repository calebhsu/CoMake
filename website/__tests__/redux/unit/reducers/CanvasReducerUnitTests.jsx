/**
 * @file Automated tests for the Redux active element..
 */

import {
  canvasReducer
} from '../../../../src/redux/reducers/CanvasReducer';
import * as RC from '../../../../src/redux/reducers/ReducerConstants';
import * as AC from '../../../../src/redux/actions/ActionConstants';
import * as ReducerUtil from '../../../../src/redux/reducers/ReducerUtil';

describe('CanvasReducerUnitTests', () => {

  beforeEach(() => {
    spyOn(ReducerUtil, 'insertIntoState');
    spyOn(ReducerUtil, 'removeField');
  });

  test('canvasReducer_AddCanvas', () => {
    const testId = 'testId';
    const testInfo = 'testInfo';
    const testAction = {
      type: AC.ADD_CANVAS,
      canvasId: testId,
      payload: testInfo,
    }
    canvasReducer(RC.BLANK_STATE, testAction);
    expect(ReducerUtil.insertIntoState).toHaveBeenCalledWith(RC.BLANK_STATE,
      testInfo, [RC.CANVASES, testId]);
  });

  test('canvasReducer_RemoveCanvas', () => {
    const testId = 'testId';
    const testAction = {
      type: AC.REMOVE_CANVAS,
      canvasId: testId,
    };
    canvasReducer(RC.BLANK_STATE, testAction);
    expect(ReducerUtil.removeField).toHaveBeenCalledWith(RC.BLANK_STATE,
      [RC.CANVASES, testId]);
  });

  test('canvasReducer_SetCurrentCanvas', () => {
    const testId = 'testId';
    const testAction = {
      type: AC.SET_CURRENT_CANVAS,
      payload: testId,
    }
    canvasReducer(RC.BLANK_STATE, testAction);
    expect(ReducerUtil.insertIntoState).toHaveBeenCalledWith(RC.BLANK_STATE,
      testId, [RC.CURRENT_CANVAS]);
  });

  test('canvasReducer_NotSupportedAction', () => {
    const testAction = {
      type: 'NotSupported',
      payload: 'something',
    }
    expect(canvasReducer(RC.BLANK_STATE, testAction))
      .toEqual(RC.BLANK_STATE);
  });
});
