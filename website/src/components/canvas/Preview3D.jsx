import React, { PropTypes } from 'react';
import { ReactCraftMLRenderer } from 'craftml';

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
 * @classdesc The component that gives a 3D prreview of the model.
 */
class Preview3D extends React.Component {

  /**
   * constructor for the Sidebar.
   * @param {Object} props The props to be passed in.
   */
  constructor(props) {
    super(props);
  }

  /**
    * Gives HTML for 3D preview component.
    * @returns {HTML}   The HTML of the 3D preview.
   */
  render() {
    return (
      <div style={styles.preview3d}>
        <ReactCraftMLRenderer code={this.props.craftmlCode} />
      </div>
    );
  }
}

Preview3D.propTypes = {
  craftmlCode: PropTypes.string,
}

export default Preview3D;
