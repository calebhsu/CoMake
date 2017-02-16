/**
 * @file Automated tests for the Redux positions actions (redux/actions/positionsActions).
 */

import {
  initElements, updatePosition
} from '../../../../src/redux/actions/ElementActions';

import {
  INIT_ELEMENTS, UPDATE_POSITION
} from '../../../../src/redux/actions/ActionConstants';


describe('PositionsActionsUnitTests.', () => {
  test('initElementsTest_ElemListEmpty', () => {
    const elemList = {};

    const expectedActionResult = {
      type: INIT_ELEMENTS,
      elements: elemList,
    };

    expect(initElements(elemList)).toEqual(expectedActionResult);
  });

  test('initElementsTest_ElemListNonEmpty', () => {
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
      elements: elemList,
    };

    expect(initElements(elemList)).toEqual(expectedActionResult);
  });

  test('updatePositionTest_ElemIdAndUpdatedLocValid', () => {
    const elemId = "test";

    const updatedLoc = {
      x: 42,
      y: 43
    };

    const expectedActionResult = {
      type: UPDATE_POSITION,
      elementId: elemId,
      payload: updatedLoc,
    };

    expect(updatePosition(elemId, updatedLoc)).toEqual(expectedActionResult);
  });

  test('updatePositionAndPersistTest', () => {
    // TODO: do this
  });

  // TODO: more tests for action?
});
