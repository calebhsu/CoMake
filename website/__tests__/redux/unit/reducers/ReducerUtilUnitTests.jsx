/**
 * @file Unit tests for ReducerUtil.jsx
 */

import {
  insertIntoState, removeField
} from '../../../../src/redux/reducers/ReducerUtil';

import * as RC from '../../../../src/redux/reducers/ReducerConstants';

describe('ReducerUtilUnitTests', () => {

  const currCanvasField = {};
  currCanvasField[RC.CANVAS_NAME] = null;
  currCanvasField[RC.CANVAS_OWNER] = null;
  currCanvasField[RC.CANVAS_USERS] = [];
  currCanvasField[RC.CANVAS_ELEMENTS] = { 'test': { 'x': 100 } };
  currCanvasField[RC.CANVAS_ACTIVE_ELEMENT] = null;
  const tempState = {};
  tempState[RC.CURRENT_CANVAS] = currCanvasField;
  const stateOneElem = Object.assign({}, RC.BLANK_STATE, tempState);

  test('insertIntoState_NoPath', () => {
    expect(insertIntoState(RC.BLANK_STATE, 5, [])).toEqual(RC.BLANK_STATE);
  });

  test('insertIntoState_UpdateFieldString', () => {
    // Form expected.
    const admin = 'Vin Diesel';
    const updatedSubField = {};
    updatedSubField[RC.CANVAS_NAME] = null;
    updatedSubField[RC.CANVAS_OWNER] = admin;
    updatedSubField[RC.CANVAS_USERS] = [];
    updatedSubField[RC.CANVAS_ELEMENTS] = {};
    updatedSubField[RC.CANVAS_ACTIVE_ELEMENT] = null;
    const updatedField = {};
    updatedField[RC.CURRENT_CANVAS] = updatedSubField;
    const expected = Object.assign({}, RC.BLANK_STATE, updatedField);
    const path = [RC.CURRENT_CANVAS, RC.CANVAS_OWNER];
    // Check to make sure updated correctly.
    expect(insertIntoState(RC.BLANK_STATE, admin, path)).toEqual(expected);
    // Check to make sure a deep copy was made.
    expect(RC.BLANK_STATE[RC.CURRENT_CANVAS][RC.CANVAS_OWNER]).toEqual(null);
  });

  test('insertIntoState_UpdateFieldObject', () => {
    const elementField = { 'test': { 'x': 100 } };
    const updatedSubField = {};
    updatedSubField[RC.CANVAS_NAME] = null;
    updatedSubField[RC.CANVAS_OWNER] = null;
    updatedSubField[RC.CANVAS_USERS] = [];
    updatedSubField[RC.CANVAS_ELEMENTS] = elementField;
    updatedSubField[RC.CANVAS_ACTIVE_ELEMENT] = null;
    const updatedField = {};
    updatedField[RC.CURRENT_CANVAS] = updatedSubField;
    const expected = Object.assign({}, RC.BLANK_STATE, updatedField);
    const path = [RC.CURRENT_CANVAS, RC.CANVAS_ELEMENTS];
    expect(insertIntoState(RC.BLANK_STATE, elementField, path))
      .toEqual(expected);
    // Check to make sure a deep copy was made.
    expect(RC.BLANK_STATE[RC.CURRENT_CANVAS][RC.CANVAS_ELEMENTS])
      .toEqual({});
  });

  test('insertIntoState_AddNewElement', () => {
    const elementField = { 'test': { 'x': 100 } };
    const updatedSubField = {};
    updatedSubField[RC.CANVAS_NAME] = null;
    updatedSubField[RC.CANVAS_OWNER] = null;
    updatedSubField[RC.CANVAS_USERS] = [];
    updatedSubField[RC.CANVAS_ELEMENTS] = elementField;
    updatedSubField[RC.CANVAS_ACTIVE_ELEMENT] = null;
    const updatedField = {};
    updatedField[RC.CURRENT_CANVAS] = updatedSubField;
    const expected = Object.assign({}, RC.BLANK_STATE, updatedField);
    const path = [RC.CURRENT_CANVAS, RC.CANVAS_ELEMENTS, 'test'];
    expect(insertIntoState(RC.BLANK_STATE, { 'x': 100}, path))
      .toEqual(expected);
    // Check to make sure a deep copy was made.
    expect(RC.BLANK_STATE[RC.CURRENT_CANVAS][RC.CANVAS_ELEMENTS]).toEqual({});
  })

  test('insertIntoState_PathDoesNotExist', () => {
    const path = [RC.CURRENT_CANVAS, RC.CANVAS_ELEMENTS, 'test',
      RC.ELEMENT_ROTATION];
    expect(() => {
      insertIntoState(RC.BLANK_STATE, 42, path);
    }).toThrow();
  });

  test('removeField_ValidElement', () => {
    const path = [RC.CURRENT_CANVAS, RC.CANVAS_ELEMENTS, 'test'];
    expect(removeField(stateOneElem,
      path)[RC.CURRENT_CANVAS][RC.CANVAS_ELEMENTS]).toEqual({});
    expect(stateOneElem[RC.CURRENT_CANVAS][RC.CANVAS_ELEMENTS]).not.toEqual({});
  });

  test('removeField_InvalidElement', () => {
    const path = [RC.CURRENT_CANVAS, RC.CANVAS_ELEMENTS, 'invalid'];
    expect(removeField(stateOneElem, path)).toEqual(stateOneElem);
  })

  test('removeField_PathDoesNotExist', () => {
    const path = [RC.CURRENT_CANVAS, RC.CANVAS_ELEMENTS, 'test',
      RC.ELEMENT_ROTATION];
    expect(() => {
      removeField(RC.BLANK_STATE, path);
    }).toThrow();
  })

});
