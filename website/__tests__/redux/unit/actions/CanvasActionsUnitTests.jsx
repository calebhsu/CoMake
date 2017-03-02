/**
 * @file Automated tests for the Redux CurrentCanvas Actions.
 */

import {
	addCanvas, removeCanvas, setCurrentCanvas,
} from '../../../../src/redux/actions/CanvasActions';
import * as AC from '../../../../src/redux/actions/ActionConstants';


describe('CanvasActionsUnitTests', () => {
  test('addCanvas', () => {
    const testId = 'testId';
    const testInfo = 'testInfo';
    const expected = {
      type: AC.ADD_CANVAS,
      canvasId: testId,
      payload: testInfo,
    }
    expect(addCanvas(testId, testInfo)).toEqual(expected);
  });

  test('removeCanvas', () => {
    const testId = 'testId';
    const expected = {
      type: AC.REMOVE_CANVAS,
      canvasId: testId,
    }
    expect(removeCanvas(testId)).toEqual(expected);
  });

  test('setCurrentCanvas', () => {
    const testId = 'testId';
    const expected = {
      type: AC.SET_CURRENT_CANVAS,
      payload: testId,
    }
    expect(setCurrentCanvas(testId)).toEqual(expected);
  });
});
