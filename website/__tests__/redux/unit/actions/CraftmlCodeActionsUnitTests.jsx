/**
 * @file Unit tests for CraftMl Code Actions
 */

import * as CodeActions from '../../../../src/redux/actions/CraftmlCodeActions';
import * as AC from '../../../../src/redux/actions/ActionConstants';


describe('CraftmlCodeActionsUnitTests', () => {
  test('setCode', () => {
    const testCode = 'some code here';
    const expectedActionResult = {
      type: AC.SET_CODE,
      payload: testCode,
    };
    expect(CodeActions.setCode(testCode)).toEqual(expectedActionResult);
  });

  test('setAutoUpdate', () => {
    const isAuto = true;
    const expectedActionResult = {
      type: AC.SET_AUTO_CODE_UPDATE,
      payload: isAuto,
    };
    expect(CodeActions.setAutoCodeUpdate(isAuto))
      .toEqual(expectedActionResult);
  });
});
