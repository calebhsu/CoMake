import React from 'react';

import CanvasView from './CanvasView';
import OptionsBar from './options-bar/OptionsBar';
import Preview3D from './Preview3D';
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
      <Preview3D />
    </div>
  )
}

export default Canvas;
