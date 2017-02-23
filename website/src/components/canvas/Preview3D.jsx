import React from 'react';
import Paper from 'material-ui/Paper';

const styles = {
  img: {
    padding: '5px 5px 1px',
    width: 95,
  },
  paper: {
    display: 'inline-block',
    height: 90,
    textAlign: 'center',
    width: 100,
  },
  preview3d: {
    bottom: 28,
    opacity: 0.9,
    position: 'fixed',
    right: 20,
    zIndex: 100,
  },
};

/**
  * Gives HTML for 3D preview component.
  * @returns {HTML}   The HTML of the 3D preview.
 */
function Preview3D() {
  return (
    <div style={styles.preview3d}>
      <Paper zDepth={1}>
        <img src="http://placekitten.com/121/121" style={styles.img} />
      </Paper>
    </div>
  );
}

export default Preview3D;
