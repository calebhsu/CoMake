/**
 * @file Button component for switching view of canvas to side view.
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import IconButton from 'material-ui/IconButton';
import Layers from 'material-ui/svg-icons/action/flip-to-front';

import { grey800 } from 'material-ui/styles/colors';

const styles = {
  iconSize: {
    color: grey800,
    height: 32,
    width: 32,
  },
  size: {
    height: 64,
    padding: 16,
    width: 64,
  },
};

/**
 * Gives HTML for canvas side view button.
 * @returns {HTML}   The HTML of the canvas side view button.
 */
class SideViewBtn extends Component {
  constructor(props) {
    super(props);
  }

  /**
   * Renders the side view button for display.
   * @returns {HTML} The rendered HTML of the canvas side view button.
   */
  render() {
    return (
      <div>
        <IconButton
          iconStyle={styles.iconSize}
          style={styles.size}
          tooltip="Side View"
          tooltipPosition="bottom-center"
          touch={true}
        >
          <Layers />
        </IconButton>
      </div>
    );
  }
}

SideViewBtn.propTypes = {
};

export default connect()(SideViewBtn);
