/**
 * @file Unit tests for ReducerUtil.jsx
 */

import {
  insertIntoState, removeField
} from '../../../../src/redux/reducers/ReducerUtil';

import * as RC from '../../../../src/redux/reducers/ReducerConstants';

describe('ReducerUtilUnitTests', () => {

  const testElements = {};
  testElements[RC.ELEMENTS] = {'test': { 'x': 100}};
  const stateOneElem = Object.assign({}, RC.BLANK_STATE, testElements);

  test('insertIntoState_NoPath', () => {
    expect(insertIntoState(RC.BLANK_STATE, 5, [])).toEqual(RC.BLANK_STATE);
  });

  test('insertIntoState_UpdateFieldString', () => {
    // Form expected.
    const username = 'Vin Diesel';
    const userInfo = {};
    userInfo[RC.USERNAME] = username;
    userInfo[RC.USER_PHOTO_URL] = null;
    userInfo[RC.USER_EMAIL] = null;
    const tempState = {};
    tempState[RC.USER_INFO] = userInfo;
    const expected = Object.assign({}, RC.BLANK_STATE, tempState);
    const path = [RC.USER_INFO, RC.USERNAME];
    // Check to make sure updated correctly.
    expect(insertIntoState(RC.BLANK_STATE, username, path)).toEqual(expected);
    // Check to make sure a deep copy was made.
    expect(RC.BLANK_STATE[RC.USER_INFO][RC.USERNAME]).toEqual(null);
  });

  test('insertIntoState_UpdateFieldObject', () => {
    const canvasId = 'testCanvas';
    const testCanvas = {};
    testCanvas[RC.CANVAS_NAME] = 'testName';
    testCanvas[RC.CANVAS_OWNER] = 'Dwayne Johnson';
    testCanvas[RC.CANVAS_USERS] = {};
    const tempCanvases = {};
    tempCanvases[RC.CANVASES] = {};
    tempCanvases[RC.CANVASES][canvasId] = testCanvas;
    const expected = Object.assign({}, RC.BLANK_STATE, tempCanvases);
    const path = [RC.CANVASES, canvasId];
    expect(insertIntoState(RC.BLANK_STATE, testCanvas, path))
      .toEqual(expected);
    // Check to make sure a deep copy was made.
    expect(RC.BLANK_STATE[RC.CANVASES]).toEqual({});
  });

  test('insertIntoState_PathDoesNotExist', () => {
    const path = [RC.ELEMENTS, 'test', RC.ELEMENT_ROTATION];
    expect(() => {
      insertIntoState(RC.BLANK_STATE, 42, path);
    }).toThrow();
  });

  test('removeField_ValidElement', () => {
    const path = [RC.ELEMENTS, 'test'];
    expect(removeField(stateOneElem, path)[RC.ELEMENTS]).toEqual({});
    expect(stateOneElem[RC.ELEMENTS]).not.toEqual({});
  });

  test('removeField_InvalidElement', () => {
    const path = [RC.ELEMENTS, 'invalid'];
    expect(removeField(stateOneElem, path)).toEqual(stateOneElem);
  })

  test('removeField_PathDoesNotExist', () => {
    const path = [RC.ELEMENTS, 'test', RC.ELEMENT_ROTATION];
    expect(() => {
      removeField(RC.BLANK_STATE, path);
    }).toThrow();
  })

});
