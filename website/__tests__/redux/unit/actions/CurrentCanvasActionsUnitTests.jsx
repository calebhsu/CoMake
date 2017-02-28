/**
 * @file Automated tests for the Redux CurrentCanvas Actions.
 */

import * as CCActions from '../../../../src/redux/actions/CurrentCanvasActions';
import * as Consts from '../../../../src/redux/actions/ActionConstants';


describe('CurrentCanvasActionsUnitTests', () => {
  test('targetElement', () => {
    const testElemId = 'testId';
    const expected = {
      type: Consts.TARGET_ELEMENT,
      payload: testElemId,
    }
    expect(CCActions.targetElement(testElemId)).toEqual(expected);
  });
});
