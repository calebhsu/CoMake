/**
 * @file Automated tests for the Redux CurrentCanvas Actions.
 */

import * as CA from '../../../../src/redux/actions/CanvasActions';
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
    expect(CA.addCanvas(testId, testInfo)).toEqual(expected);
  });

  test('addCanvasUser', () => {
    const testId = 'testId';
    const testUserId = 'testUserId';
    const expected = {
      type: AC.ADD_CANVAS_USER,
      canvasId: testId,
      payload: testUserId,
    }
    expect(CA.addCanvasUser(testId, testUserId)).toEqual(expected);
  });

  test('removeCanvas', () => {
    const testId = 'testId';
    const expected = {
      type: AC.REMOVE_CANVAS,
      canvasId: testId,
    }
    expect(CA.removeCanvas(testId)).toEqual(expected);
  });

  test('setCurrentCanvas', () => {
    const testId = 'testId';
    const expected = {
      type: AC.SET_CURRENT_CANVAS,
      payload: testId,
    }
    expect(CA.setCurrentCanvas(testId)).toEqual(expected);
  });

  test('setCanvasName', () => {
    const testId = 'testId';
    const testName = 'testName';
    const expected = {
      type: AC.SET_CANVAS_NAME,
      canvasId: testId,
      payload: testName,
    }
    expect(CA.setCanvasName(testId, testName)).toEqual(expected);
  });

  test('setCanvasOwner', () => {
    const testId = 'testId';
    const testOwner = 'testOwner';
    const expected = {
      type: AC.SET_CANVAS_OWNER,
      canvasId: testId,
      payload: testOwner,
    }
    expect(CA.setCanvasOwner(testId, testOwner)).toEqual(expected);
  });
});
