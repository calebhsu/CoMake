/**
 * @file Automated tests for the Redux positions reducer (redux/reducers/positionsReducer).
 */

import {
  updateElementReducer
} from '../../../../src/redux/reducers/ElementReducer';

import {
  INIT_ELEMENTS, UPDATE_POSITION
} from '../../../../src/redux/actions/ActionConstants';

describe('PositionsReducerUnitTests.', () => {

  const testElementsList = {
    testItem: {
      position: { x: 42, y: 43 }
    }
  };

  const prevState = {
    elements: {
      testingANewItem: {
        position: { x: 1000, y: 33 }
      },
      testingAnotherNewItem: {
        position: { x: 1, y: 2 }
      },
      testItem: {
        position: { x: 42, y: 43 }
      }
    }
  };

  const initElementAction = {
    type: INIT_ELEMENTS,
    elements: testElementsList
  };

  test('ReducePosition_EmptyAction_InitialState', () => {
    expect(updateElementReducer(undefined, {})).toEqual({ elements: {} });
  });

  test('ReducePosition_InitPositions_NoPreviousState', () => {
    expect(updateElementReducer(undefined, initElementAction))
      .toEqual({ elements: testElementsList, targeted: null });
  });

  test('ReducePosition_InitPositions_PreviousState', () => {
    expect(updateElementReducer(prevState, initElementAction))
      .toEqual({ elements: testElementsList, targeted: null });
  });

  test('ReducePosition_UpdatePosition_InvalidUpdatedLocation_NoStateChange', () => {
    const updatePositionActionNullUpdateLocation = {
      type: UPDATE_POSITION,
      elementId: "testItem",
      payload: null
    };

    expect(updateElementReducer(prevState, updatePositionActionNullUpdateLocation))
      .toEqual(prevState);
  });

  test('ReducePosition_UpdatePosition_ValidUpdatedLocation_NoPreviousState_StateChange', () => {

    const updatePositionAction = {
      type: UPDATE_POSITION,
      elementId: 'testItem',
      payload: { x: 100, y: 200 }
    };

    const expectedStateAfterUpdatePositon = {
      elements: {
        testItem: {
          position: { x: 100, y: 200 }
        }
      }
    };
    expect(updateElementReducer(undefined, updatePositionAction))
      .toEqual(expectedStateAfterUpdatePositon);
  });

  test('ReducePosition_UpdatePosition_ValidUpdatedLocation_PreviousState_StateChange', () => {

    const updatePositionAction = {
      type: UPDATE_POSITION,
      elementId: 'testItem',
      payload: { x: 100, y: 200 }
    };

    const expectedStateAfterUpdatePositon = {
      elements: {
        testingANewItem: {
          position: { x: 1000, y: 33 }
        },
        testingAnotherNewItem: {
          position: { x: 1, y: 2 }
        },
        testItem: {
          position: { x: 100, y: 200 }
        }
      }
    };
    expect(updateElementReducer(prevState, updatePositionAction))
      .toEqual(expectedStateAfterUpdatePositon);
  });
});
