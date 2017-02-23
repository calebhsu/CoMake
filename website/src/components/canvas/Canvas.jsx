import React from 'react';

import CanvasView from './CanvasView';
import OptionsBar from './options-bar/OptionsBar';
import Sidebar from './Sidebar';

/**
 * Gives HTML for a new canvas on canvas creation.
 * @returns {HTML}   The HTML of a new canvas.
 */
function Canvas() {
  return (
    <div>
      <Sidebar />
      <OptionsBar />
      <CanvasView />
    </div>
  )
}

export default Canvas;
