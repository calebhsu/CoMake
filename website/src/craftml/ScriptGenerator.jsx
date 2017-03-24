/**
 * @file File for generating CraftML script of current canvas.
 */

/**
 * Generates CraftML script for the elements for a top-down view.
 * @param  {Object} elements Object of the elements as described in Redux state.
 * @return {String}          Script for CraftML to generate the canvas.
 */
export function generateScript(elements) {
  let script = '';
  let elementId = 1;

  // Iterate over elements and add them to script.
  const elementList = Object.values(elements);
  for (let i = 0; i < elementList.length; i++) {
    let currElement = elementList[i];

    let elementScript = '\t<element' + String(elementId) + '\n';
    elementScript += '\tmodule="' + currElement.module + '"\n';
    // Add in transitions
    elementScript += '\tt="size x ' + String(currElement.size.width / 10);
    elementScript += ' y ' + String(currElement.size.height / 10) + '; ';
    elementScript += 'position x ' + String(currElement.position.x / 10);
    elementScript += ' y ' + String(currElement.position.y / 10) + '; ';
    elementScript += 'rotate z ' + String(currElement.rotation.toFixed()) + '" />';

    script += elementScript + '\n\n';
    elementId++;
  }

  if ( script !== '' ){
    script = '<g>\n' + script + '</g>';
  }
  return script;
}
