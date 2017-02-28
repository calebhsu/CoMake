/**
 * @file Automated tests for the Redux positions reducer (redux/reducers/positionsReducer).
 */

import {
  updateElementReducer
} from '../../../../src/redux/reducers/ElementReducer';
import * as RC from '../../../../src/redux/reducers/ReducerConstants';
import * as AC from '../../../../src/redux/actions/ActionConstants';
import * as ReducerUtil from '../../../../src/redux/reducers/ReducerUtil';

describe('ElementReducerUnitTests', () => {
  const testElement = {};
  testElement[RC.ELEMENT_POSITION] = {'x': 1, 'y': 1};
  testElement[RC.ELEMENT_SIZE] = {'height': 1, 'width': 1};
  testElement[RC.ELEMENT_ROTATION] = 1;
  testElement[RC.ELEMENT_MODULE] = 'one';
  const elements = {'oneElem': testElement};
  const loadedState = Object.assign({}, RC.BLANK_STATE);
  loadedState[RC.CURRENT_CANVAS][RC.CANVAS_ELEMENTS] = elements;

  beforeEach(() => {
    spyOn(ReducerUtil, 'insertIntoState');
  });

  test('updateElementReducer_InitElements', () => {
    const initAction = {
      type: AC.INIT_ELEMENTS,
      payload: elements,
    }
    updateElementReducer(RC.BLANK_STATE, initAction);
    expect(ReducerUtil.insertIntoState).toHaveBeenCalledWith(RC.BLANK_STATE,
      elements, [RC.CURRENT_CANVAS, RC.CANVAS_ELEMENTS]);
  });

  test('updateElementReducer_UpdatePosition', () => {
    const newPosition = { 'x': 10, 'y': 10 };
    const elemId = 'oneElem';
    const positionAction = {
      type: AC.UPDATE_POSITION,
      payload: newPosition,
      elementId: elemId,
    }
    updateElementReducer(loadedState, positionAction);
    expect(ReducerUtil.insertIntoState).toHaveBeenCalledWith(loadedState,
      newPosition, [RC.CURRENT_CANVAS, RC.CANVAS_ELEMENTS, elemId,
      RC.ELEMENT_POSITION]);
  });

  test('updateElementReducer_UpdateSize', () => {
    const newSize = { 'width': 10, 'height': 10 };
    const elemId = 'oneElem';
    const positionAction = {
      type: AC.UPDATE_SIZE,
      payload: newSize,
      elementId: elemId,
    }
    updateElementReducer(loadedState, positionAction);
    expect(ReducerUtil.insertIntoState).toHaveBeenCalledWith(loadedState,
      newSize, [RC.CURRENT_CANVAS, RC.CANVAS_ELEMENTS, elemId, RC.ELEMENT_SIZE]);
  });

  test('updateElementReducer_UpdateRotation', () => {
    const newRotation = 10;
    const elemId = 'oneElem';
    const positionAction = {
      type: AC.UPDATE_ROTATION,
      payload: newRotation,
      elementId: elemId,
    }
    updateElementReducer(loadedState, positionAction);
    expect(ReducerUtil.insertIntoState).toHaveBeenCalledWith(loadedState,
      newRotation, [RC.CURRENT_CANVAS, RC.CANVAS_ELEMENTS, elemId,
      RC.ELEMENT_ROTATION]);
  });

  test('updateElementReducer_InvalidAction', () => {
    const nonAction = {
      type: 'NonAction',
    }
    expect(updateElementReducer(loadedState, nonAction)).toEqual(loadedState);
  });
});
