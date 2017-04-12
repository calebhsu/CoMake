/**
 * @file Button component for switching view of canvas to side view.
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import IconButton from 'material-ui/IconButton';
import FlipToFront from 'material-ui/svg-icons/action/flip-to-front';
import Layers from 'material-ui/svg-icons/maps/layers';

import * as CanvasActions from '../../../redux/actions/CanvasActions';

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
 * Gives HTML for canvas orientation buttons.
 * @returns {HTML}   The HTML of the canvas orientation buttons.
 */
class CanvasOrientationBtns extends Component {
  /**
   * Constructor for CanvasOrientationBtns
   * @param {Object} props The props for the CanvasOrientationBtns.
   */
  constructor(props) {
    super(props);
    this.state = {
      orientation: 'overhead',
    };

    this.handleOrientSide = this.handleOrientSide.bind(this);
    this.handleOrientOverhead = this.handleOrientOverhead.bind(this);
    this.setOrientation = this.setOrientation.bind(this);
  }

  /**
  * Handler for onTouchTap that sets orientation state to overhead.
  * @returns {void}
  */
  handleOrientOverhead() {
    this.setState({orientation: 'overhead'});
  }

  /**
  * Handler for onTouchTap that sets orientation state to side.
  * @returns {void}
  */
  handleOrientSide() {
    this.setState({orientation: 'side'});
  }


   /**
   * Sets canvas orientation
   * Triggered By: Orientation view button onTouchTapEvent
   * @returns {void}
   */
   setOrientation() {
    //  this.props.dispatch(CanvasActions.setCanvasOrientation(this.props.currentCanvas,
    //    this.state.orientation));
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
          onTouchTap={this.handleOrientOverhead}
          style={styles.size}
          tooltip="Overhead View"
          tooltipPosition="bottom-center"
          touch={true}
        >
          <Layers />
        </IconButton>
        <IconButton
          iconStyle={styles.iconSize}
          onTouchTap={this.handleOrientSide}
          style={styles.size}
          tooltip="Side View"
          tooltipPosition="bottom-center"
          touch={true}
        >
          <FlipToFront />
        </IconButton>
      </div>
    );
  }
}

CanvasOrientationBtns.propTypes = {
  currentCanvas: PropTypes.string,
  dispatch: PropTypes.func,
};

export default connect()(CanvasOrientationBtns);
