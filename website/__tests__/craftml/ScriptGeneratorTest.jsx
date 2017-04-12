/**
 * @file Unit tests for ScriptGenerator
 */

import { generateOverheadScript, generateSideScript } from './../../src/craftml/ScriptGenerator';

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

const EXPECTED_OVERHEAD_SCRIPT = ('<g>\n\t<element1\n\tmodule="AoN5x"\n'
  + '\tt="size x 3 y 5; position x 10 y 20; rotate z 0" />\n\n'
  + '\t<element2\n\tmodule="Baxrz"\n'
  + '\tt="size x 10 y 10; position x 40 y 50; rotate z 30" />\n\n'
  + '\t<element3\n\tmodule="1CEKd"\n'
  + '\tt="size x 1 y 1; position x 2 y 2; rotate z -50" />\n\n</g>');

const EXPECTED_SIDE_SCRIPT = ('<g>\n\t<element1\n\tmodule="AoN5x"\n'
  + '\tt="size x 3 z 5; position x 10 z -20; rotate y 0" />\n\n'
  + '\t<element2\n\tmodule="Baxrz"\n'
  + '\tt="size x 10 z 10; position x 40 z -50; rotate y 30" />\n\n'
  + '\t<element3\n\tmodule="1CEKd"\n'
  + '\tt="size x 1 z 1; position x 2 z -2; rotate y -50" />\n\n</g>');

describe('ScriptGeneratorTest', () => {
  test('generateOverheadScript_emptyElements', () => {
    const emptyElements = {};
    expect(generateOverheadScript(emptyElements)).toEqual('');
  });

  test('generateOverheadScript_validElements', () => {
    expect(generateOverheadScript(TEST_ELEMENTS)).toEqual(EXPECTED_OVERHEAD_SCRIPT);
  });

  test('generateSideScript_emptyElements', () => {
    const emptyElements = {};
    expect(generateSideScript(emptyElements)).toEqual('');
  });

  test('generateSideScript_validElements', () => {
    expect(generateSideScript(TEST_ELEMENTS)).toEqual(EXPECTED_SIDE_SCRIPT);
  });
});
