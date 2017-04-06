/**
 * @file Unit tests for craftml reducer.
 */

import {
  craftmlCodeReducer
} from '../../../../src/redux/reducers/CraftmlCodeReducer';
import * as RC from '../../../../src/redux/reducers/ReducerConstants';
import * as AC from '../../../../src/redux/actions/ActionConstants';
import * as ReducerUtil from '../../../../src/redux/reducers/ReducerUtil';

describe('CraftmlCodeReducerUnitTests', () => {

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

  test('craftmlCodeReducer_SetAutoUpdate', () => {
    const isAuto = true;
    const setAutoAction = {
      type: AC.SET_AUTO_CODE_UPDATE,
      payload: isAuto,
    };
    craftmlCodeReducer(RC.BLANK_STATE, setAutoAction);
    expect(ReducerUtil.insertIntoState).toHaveBeenCalledWith(RC.BLANK_STATE,
      isAuto, [RC.AUTO_GENERATE_CODE]);
  });

  test('craftmlCodeReducer_SetAutoUpdate_InvalidCondition', () => {
    const setAutoAction = {
      type: AC.SET_AUTO_CODE_UPDATE,
      payload: 'error',
    };
    expect(() => {
      craftmlCodeReducer(RC.BLANK_STATE, setAutoAction);
    }).toThrow();
  });
});
