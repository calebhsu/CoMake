import React from 'react';
import GridTile from 'material-ui/GridList';

const styles = {
  preview3d: {
    bottom: 15,
    position: 'absolute',
    right: 15,
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
      <GridTile>
        <img src="http://placekitten.com/95/95" />
      </GridTile>
    </div>
  );
}

export default Preview3D;
