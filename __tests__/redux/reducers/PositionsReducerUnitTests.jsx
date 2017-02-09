/**
 * @file Automated tests for the Redux positions reducer (redux/reducers/positionsReducer).
 */

import reducePosition from '../../../src/components/redux/reducers/positionsReducer';

const testElementsList = {
  "testItem": {
    "position": {
      "x": 42,
      "y": 43
    }
  }
};

const prevState = {
  "elements": {
    "testingANewItem": {
      "position": {
        "x": 1000,
        "y": 33
      }
    },
    "testingAnotherNewItem": {
      "position": {
        "x": 1,
        "y": 2
      }
    }
  }
};

const initPositionsAction = {
  type: 'initPositions',
  elements: testElementsList
};

const updatePositionAction = {
  type: 'updatePosition',
  elementId: "testItem",
  updatedLocation: {
    "x": 100,
    "y": 200
  }
};

describe('PositionsReducerUnitTests', () => {
  test('ReducePosition_EmptyAction_InitialState', () => {
    expect(reducePosition(undefined, {})).toEqual({ elements: {} });
  });

  test('ReducePosition_InitPositions_NoPreviousState', () => {
    expect(reducePosition(undefined, initPositionsAction)).toEqual({ elements: testElementsList });
  });

  test('ReducePosition_InitPositions_PreviousState', () => {
    expect(reducePosition(prevState, initPositionsAction))
      .toEqual({ elements: testElementsList });
  });

  test('ReducePosition_UpdatePosition_InvalidUpdatedLocation_NoStateChange', () => {
    const updatePositionActionNullUpdateLocation = {
      type: 'updatePosition',
      elementId: "testItem",
      updatedLocation: null
    };

    expect(reducePosition(prevState, updatePositionActionNullUpdateLocation))
      .toEqual(prevState);
  });

  // TODO: More tests
});