/**
 * @file Automated tests for the Redux CurrentCanvas Actions.
 */

import {
  targetElement
} from '../../../../src/redux/actions/ActiveElementActions';
import * as AC from '../../../../src/redux/actions/ActionConstants';


describe('ActiveElementActionsTests', () => {
  test('targetElement', () => {
    const testElemId = 'testId';
    const expected = {
      type: AC.TARGET_ELEMENT,
      payload: testElemId,
    }
    expect(targetElement(testElemId)).toEqual(expected);
  });
});
