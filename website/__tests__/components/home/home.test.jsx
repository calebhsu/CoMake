/**
 * @file Unit tests for ScriptGenerator
 */

import {Home} from './../../src/components/canvas/home/Home';

test('Home page Test', () => {
  expect(Home()).toBe(3);
});
