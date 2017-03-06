/**
 * @file Unit tests for ScriptGenerator
 */

import { generateScript } from './../../src/craftml/ScriptGenerator';

const TEST_ELEMENTS = {
  element1: {
    position: {
      x: 100,
      y: 200,
    },
    size: {
      width: 30,
      height: 50,
    },
    rotation: 0,
    module: 'AoN5x',
  },
  element2: {
    position: {
      x: 400,
      y: 500,
    },
    size: {
      width: 100,
      height: 100,
    },
    rotation: 30,
    module: 'Baxrz',
  },
  element3: {
    position: {
      x: 20,
      y: 20,
    },
    size: {
      width: 10,
      height: 10,
    },
    rotation: -50,
    module: '1CEKd',
  },
};

const EXPECTED_SCRIPT = ('<g>\n\t<element1\n\tmodule="AoN5x"\n'
  + '\tt="size x 30 y 50; position x 100 y 200; rotate z 0" />\n\n'
  + '\t<element2\n\tmodule="Baxrz"\n'
  + '\tt="size x 100 y 100; position x 400 y 500; rotate z 30" />\n\n'
  + '\t<element3\n\tmodule="1CEKd"\n'
  + '\tt="size x 10 y 10; position x 20 y 20; rotate z -50" />\n\n</g>');

describe('ScriptGeneratorTest', () => {
  test('generateScript_emptyElements', () => {
    const emptyElements = {};
    expect(generateScript(emptyElements)).toEqual('');
  });

  test('generateScript_validElements', () => {
    expect(generateScript(TEST_ELEMENTS)).toEqual(EXPECTED_SCRIPT);
  });
});
