/* Component encapsulting all components having to do with Board page. */

import React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import Board from './Board';

/**
 * Returns the HTML for the page with the board.
 * @return {HTML}   The HTML of the navigation bar.
 */
function BoardView() {
  return <Board />;
}

export default DragDropContext(HTML5Backend)(BoardView);
