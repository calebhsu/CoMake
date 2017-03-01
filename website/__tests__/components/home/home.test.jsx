/**
 * @file Unit tests for Home page
 */
import {homeUnitTests} from './../../src/components/canvas/home/Home';

/**
 * Tests to see if store was called to generate the canvas list
 * @returns {bool} True if expected value passes after running test
 */
describe('Home Page Unit Tests', () => {
	test('Testing Home::generateCanvasList', () => {
  		expect(homeUnitTests()).toEqual(true/*store call here*/);
	});
});
