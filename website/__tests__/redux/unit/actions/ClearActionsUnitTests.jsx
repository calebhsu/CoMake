/**
 * @file
 */
 
import * as ClearActions from '../../../../src/redux/actions/ClearActions';
import { CLEAR } from '../../../../src/redux/actions/ActionConstants';

describe('ClearActionsUnitTests', () => {
  test('clear', () => {
    const expectedActionResult = {
      type: CLEAR
    };
    expect(ClearActions.clear()).toEqual(expectedActionResult);
  });
});