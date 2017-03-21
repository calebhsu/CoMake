/**
 * @file Unit tests for craftml reducer.
 */

import {
  craftmlCodeReducer
} from '../../../../src/redux/reducers/CraftmlCodeReducer';
import * as RC from '../../../../src/redux/reducers/ReducerConstants';
import * as AC from '../../../../src/redux/actions/ActionConstants';
import * as ReducerUtil from '../../../../src/redux/reducers/ReducerUtil';

describe('ElementReducerUnitTests', () => {

  beforeEach(() => {
    spyOn(ReducerUtil, 'insertIntoState');
  });

  test('craftmlCodeReducer_SetCode', () => {
    const expectedCode = 'some code here';
    const setCodeAction = {
      type: AC.SET_CODE,
      payload: expectedCode,
    };
    craftmlCodeReducer(RC.BLANK_STATE, setCodeAction);
    expect(ReducerUtil.insertIntoState).toHaveBeenCalledWith(RC.BLANK_STATE,
      expectedCode, [RC.CODE]);
  });

  test('craftmlCodeReducer_SetCode_InvalidCode', () => {
    const setCodeAction = {
      type: AC.SET_CODE,
      payload: null,
    };
    expect(() => {
      craftmlCodeReducer(RC.BLANK_STATE, setCodeAction);
    }).toThrow();
  });

  test('craftmlCodeReducer_ToggleAutoUpdate_toTrue', () => {
    const toggleAction = {
      type: AC.TOGGLE_AUTO_CODE_UPDATE,
    };
    craftmlCodeReducer(RC.BLANK_STATE, toggleAction);
    expect(ReducerUtil.insertIntoState).toHaveBeenCalledWith(RC.BLANK_STATE,
      true, [RC.AUTO_GENERATE_CODE]);
  });

  test('craftmlCodeReducer_ToggleAutoUpdate_toFalse', () => {
    const toggleAction = {
      type: AC.TOGGLE_AUTO_CODE_UPDATE,
    };
    const stateWithTrue = Object.assign({}, RC.BLANK_STATE);
    stateWithTrue[RC.AUTO_GENERATE_CODE] = true;
    craftmlCodeReducer(stateWithTrue, toggleAction);
    expect(ReducerUtil.insertIntoState).toHaveBeenCalledWith(stateWithTrue,
      false, [RC.AUTO_GENERATE_CODE]);
  });

});
