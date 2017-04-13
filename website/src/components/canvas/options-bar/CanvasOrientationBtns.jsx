/**
 * @file Button component for switching view of canvas to side view.
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import FlipToFront from 'material-ui/svg-icons/action/flip-to-front';
import IconButton from 'material-ui/IconButton';
import Layers from 'material-ui/svg-icons/maps/layers';

import * as CA from '../../../redux/actions/CanvasActions';
import * as CC from '../CanvasConstants';
import * as RC from '../../../redux/reducers/ReducerConstants';

import { grey400, grey800 } from 'material-ui/styles/colors';

const styles = {
  activeIcon: {
    backgroundColor: grey400,
    borderRadius: '50%',
    color: grey800,
    height: 32,
    padding: 3,
    width: 32,
  },
  inactiveIcon: {
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
    this.handleOrientOverhead = this.handleOrientOverhead.bind(this);
    this.handleOrientSide = this.handleOrientSide.bind(this);
    this.setOrientation = this.setOrientation.bind(this);
  }

  /**
  * Handler for onTouchTap that sets orientation to overhead
  * by calling dispatch function setOrientation
  * @returns {void}
  */
  handleOrientOverhead() {
    this.setOrientation(CC.OVERHEAD_VIEW);
  }

  /**
  * Handler for onTouchTap that sets orientation to side.
  * by calling dispatch function setOrientation
  * @returns {void}
  */
  handleOrientSide() {
    this.setOrientation(CC.SIDE_VIEW);
  }

   /**
   * Sets canvas orientation by dispatching set canvas orientation event
   * @param {String} orientation  The canvas orientation.
   * @returns {void}
   */
   setOrientation(orientation) {
     this.props.dispatch(CA.setCanvasOrientationAndPersist(this.props.currentCanvas,
       orientation));
   }

  /**
   * Renders the side view button for display.
   * @returns {HTML} The rendered HTML of the canvas side view button.
   */
  render() {
    const canvasOrientation = this.props.canvas ? this.props.canvas[RC.CANVAS_ORIENTATION] : CC.OVERHEAD_VIEW;

    return (
      <div>
        <IconButton
          iconStyle={canvasOrientation === CC.OVERHEAD_VIEW ? styles.activeIcon : styles.inactiveIcon}
          onTouchTap={this.handleOrientOverhead}
          style={styles.size}
          tooltip="Overhead View"
          tooltipPosition="bottom-center"
          touch={true}
        >
          <Layers />
        </IconButton>
        <IconButton
          iconStyle={canvasOrientation === CC.SIDE_VIEW ? styles.activeIcon : styles.inactiveIcon}
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
  canvas: PropTypes.object,
  currentCanvas: PropTypes.string,
  dispatch: PropTypes.func,
};

export default connect()(CanvasOrientationBtns);
