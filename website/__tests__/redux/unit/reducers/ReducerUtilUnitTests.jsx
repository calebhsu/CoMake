/**
 * @file Unit tests for ReducerUtil.jsx
 */

import { insertIntoState } from '../../../../src/redux/reducers/ReducerUtil';

import * as RC from '../../../../src/redux/reducers/ReducerConstants';

describe('ReducerUtilUnitTests', () => {

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

  test('insertIntoState_PathDoesNotExist', () => {
    const path = [RC.CURRENT_CANVAS, RC.CANVAS_ELEMENTS, 'test',
      RC.ELEMENT_ROTATION];
    expect(() => {
      insertIntoState(RC.BLANK_STATE, 42, path);
    }).toThrow();
  });

});