/**
 * @file Automated tests for the Redux positions actions (redux/actions/positionsActions).
 */

import { initPositions, updatePosition, updatePositionAndPersist } from '../../../src/components/redux/actions/positionsActions';

describe('PositionsActionsUnitTests', () => {
  test('initPositionsTest_ElemListEmpty', () => {
    const elemList = {};

    const expectedActionResult = {
      type: 'initPositions',
      elements: elemList,
    };

    expect(initPositions(elemList)).toEqual(expectedActionResult);
  });

  test('initPositionsTest_ElemListNonEmpty', () => {
    const elemList = {
      "testItem": {
        "position": {
          "x": 42,
          "y": 43
        }
      }
    };

    const expectedActionResult = {
      type: 'initPositions',
      elements: elemList,
    };

    expect(initPositions(elemList)).toEqual(expectedActionResult);
  });

  test('updatePositionTest_ElemIdAndUpdatedLocValid', () => {
    const elemId = "test";

    const updatedLoc = {
      "x": 42,
      "y": 43
    };

    const expectedActionResult = {
      type: 'updatePosition',
      elementId: elemId,
      updatedLocation: updatedLoc,
    };

    expect(updatePosition(elemId, updatedLoc)).toEqual(expectedActionResult);
  });

  test('updatePositionAndPersistTest', () => {
    // TODO: do this
  });

  // TODO: more tests for action?
});
