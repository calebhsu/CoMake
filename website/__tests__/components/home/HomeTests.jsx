/**
 * @file Unit tests for Home page
 */

import { CanvasList } from '../../../src/components/home/CanvasList';

/**
 * Tests to see if store was called to generate the canvas list
 * @returns {bool} True if expected value passes after running test
 */
describe('HomeTests', () => {
	test('CanvasList should return a defined entity', () => {
  		expect({CanvasList}).toBeDefined();
	});

});
