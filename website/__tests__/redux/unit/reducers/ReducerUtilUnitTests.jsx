/**
 * @file Unit tests for ReducerUtil.jsx
 */

import {
  insertIntoState, formPathToElementAttr
} from '../../../../src/redux/reducers/ReducerUtil';

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
    updatedSubField[RC.CANVAS_ADMIN] = admin;
    updatedSubField[RC.CANVAS_COLLABORATORS] = [];
    updatedSubField[RC.CANVAS_ELEMENTS] = {};
    updatedSubField[RC.CANVAS_ACTIVE_ELEMENT] = null;
    const updatedField = {};
    updatedField[RC.CURRENT_CANVAS] = updatedSubField;
    const expected = Object.assign({}, RC.BLANK_STATE, updatedField);
    const path = [RC.CURRENT_CANVAS, RC.CANVAS_ADMIN];
    // Check to make sure updated correctly.
    expect(insertIntoState(RC.BLANK_STATE, admin, path)).toEqual(expected);
    // Check to make sure a deep copy was made.
    expect(RC.BLANK_STATE[RC.CURRENT_CANVAS][RC.CANVAS_ADMIN]).toEqual(null);
  });

  test('insertIntoState_CreateFieldObject', () => {
    const testElement = {};
    testElement[RC.ELEMENT_POSITION] = { 'x': 100 };
    const elementField = { 'test': testElement };
    const updatedSubField = {};
    updatedSubField[RC.CANVAS_NAME] = null;
    updatedSubField[RC.CANVAS_ADMIN] = null;
    updatedSubField[RC.CANVAS_COLLABORATORS] = [];
    updatedSubField[RC.CANVAS_ELEMENTS] = elementField;
    updatedSubField[RC.CANVAS_ACTIVE_ELEMENT] = null;
    const updatedField = {};
    updatedField[RC.CURRENT_CANVAS] = updatedSubField;
    const expected = Object.assign({}, RC.BLANK_STATE, updatedField);
    const path = [RC.CURRENT_CANVAS, RC.CANVAS_ELEMENTS, 'test',
      RC.ELEMENT_POSITION];
    expect(insertIntoState(RC.BLANK_STATE, { 'x': 100 }, path))
      .toEqual(expected);
    // Check to make sure a deep copy was made.
    expect(RC.BLANK_STATE[RC.CURRENT_CANVAS][RC.CANVAS_ELEMENTS])
      .toEqual({});
  });

  test('formPathToElementAttr_InvalidAttr', () => {
    expect(() => {
      formPathToElementAttr('test', 'blablabla');
    }).toThrow();
  })

  test('formPathToElementAttr_ValidAttr', () => {
    const expected = [RC.CURRENT_CANVAS, RC.CANVAS_ELEMENTS, 'test',
      RC.ELEMENT_SIZE];
    expect(formPathToElementAttr('test', RC.ELEMENT_SIZE)).toEqual(expected);
  })

});
