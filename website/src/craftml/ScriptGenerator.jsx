/**
 * @file File for generating CraftML scripts of current canvas.
 */

import { SIDE_VIEW } from '../components/canvas/CanvasConstants';

/**
 * Generates CraftML script for the elements based on canvas orientation.
 * @param  {Object} elements    Object of the elements as described in Redux state.
 * @param  {String} orientation String of the canvas orientation.
 * @return {String}             Script for CraftML to generate the canvas.
 */
export function generateScript(elements, orientation) {
  let script = '';
  let elementId = 1;

  // Set transformation axes based on orientation
  let orientAxis = ' y ';
  let rotateAxis = ' z ';
  let multiplier = 1;

  if (orientation === SIDE_VIEW) {
     orientAxis = ' z ';
     rotateAxis = ' y ';
     multiplier = -1;
  }

  // Iterate over elements and add them to script.
  const elementList = Object.values(elements);
  for (let i = 0; i < elementList.length; i++) {
    let currElement = elementList[i];

    let elementScript = '\t<element' + String(elementId) + '\n';
    elementScript += '\tmodule="' + currElement.module + '"\n';

    elementScript += '\tt="size x ' + String(currElement.size.width / 10);
    elementScript += orientAxis + String(currElement.size.height / 10) + '; ';
    elementScript += 'position x ' + String(currElement.position.x / 10);
    elementScript += orientAxis + String(multiplier * currElement.position.y / 10) + '; ';
    elementScript += 'rotate' + rotateAxis + String(currElement.rotation.toFixed()) + '" />';

    script += elementScript + '\n\n';
    elementId++;
  }

  if ( script !== '' ){
    script = '<g>\n' + script + '</g>';
  }
  return script;
}
