/**
 * @file Unit tests for Home page
 */
import { handleCanvasListUnitTests } from '../../../src/components/canvas/CanvasList';
/**
 * Tests to see if store was called to generate the canvas list
 * @returns {bool} True if expected value passes after running test
 */

describe('HomeTests', () => {
	test('Test HomeTests::handleCanvasListUnitTests', () => {
  		expect(handleCanvasListUnitTests()).toBe(true/*store call here*/);
	});
});
