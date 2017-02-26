/**
 * @file Automated tests for the Redux Element Actions.
 */

import {
  initElements, updateElement
} from '../../../../src/redux/actions/ElementActions';

import {
  INIT_ELEMENTS, UPDATE_POSITION
} from '../../../../src/redux/actions/ActionConstants';


describe('ElementActionsUnitTests', () => {
  test('initElementsTest_ElemListEmpty', () => {
    const elemList = {};

    const expectedActionResult = {
      type: INIT_ELEMENTS,
      payload: elemList,
    };

    expect(initElements(elemList)).toEqual(expectedActionResult);
  });

  test('initElementsTest_ElemListNotEmpty', () => {
    const elemList = {
      testItem: {
        position: {
          x: 42,
          y: 43
        }
      }
    };

    const expectedActionResult = {
      type: INIT_ELEMENTS,
      payload: elemList,
    };

    expect(initElements(elemList)).toEqual(expectedActionResult);
  });

  test('updateElement', () => {
    const testPayload = { 'somePayload': 'someInfo' };
    const elemId = 'someId';
    const expected = {
      type: UPDATE_POSITION,
      elementId: elemId,
      payload: testPayload,
    }
    expect(updateElement(UPDATE_POSITION, elemId, testPayload))
      .toEqual(expected);
  });

  /* TODO: Once firebase can be mocked spy on firebase-util function and
   * test logic for updateAnd Persist.
   */
});
