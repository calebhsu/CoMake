/* Component encapsulting all components having to do with Board page. */

import React from 'react';
import Board from './Board';

/**
 * Returns the HTML for the page with the board.
 * @return {HTML}   The HTML of the navigation bar.
 */
function BoardView() {
  return <Board />;
}

export default BoardView;
