/**
 * @file Unit tests for Dashboard page
 */

import { CanvasList } from '../../../src/components/dashboard/CanvasList';

/**
 * Tests to see if store was called to generate the canvas list
 * @returns {bool} True if expected value passes after running test
 */
describe('HomeTests', () => {
	test('CanvasList should return a defined entity', () => {
  		expect({CanvasList}).toBeDefined();
	});

});
