/**
 * @file File for generating CraftML script of current canvas.
 */

/**
 * Generates CraftML script for the elements for a top-down view.
 * @param  {Object} elements Object of the elements as described in Redux state.
 * @return {String}          Script for CraftML to generate the canvas.
 */
export function generateScript(elements) {
  let script = '<g>\n';
  let elementId = 1;

  // Iterate over elements and add them to script.
  const elementList = Object.values(elements);
  for (let i = 0; i < elementList.length; i++) {
    let currElement = elementList[i];

    let elementScript = '\t<element' + String(elementId) + '\n';
    elementScript += '\tmodule="' + currElement.module + '"\n';
    // Add in transitions
    elementScript += '\tt="size x ' + String(currElement.size.width);
    elementScript += ' y ' + String(currElement.size.height) + '; ';
    elementScript += 'position x ' + String(currElement.position.x);
    elementScript += ' y ' + String(currElement.position.y) + '; ';
    elementScript += 'rotate z ' + String(currElement.rotation) + '" />';

    script += elementScript + '\n\n';
    elementId++;
  }
  
  script += '</g>';
  return script;
}
