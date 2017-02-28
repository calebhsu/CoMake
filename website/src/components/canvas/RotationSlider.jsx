/**
 * @file Component of slider for rotating canvas elements.
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Slider from 'material-ui/Slider';

import {
  UPDATE_ROTATION
} from '../../redux/actions/ActionConstants';
import {
  updateAndPersist
} from '../../redux/actions/ElementActions';
import { DEFAULT_SLIDER_POSITION } from './CanvasConstants';
import * as RC from '../../redux/reducers/ReducerConstants';

/**
 * Component of slider for rotating canvas elements.
 */
class RotationSlider extends React.Component {

  /**
   * Constructor for RotationSlider
   * @param {Object} props The props for the RotationSlider.
   */
  constructor(props) {
    super(props);
    this.handleSliderChange = this.handleSliderChange.bind(this);
  }

  /**
   * Handles slider change event by dispatching update rotation event.
   * @param {Event} e The slider change event.
   * @param {Number} sliderVal The percentage the slider was moved to.
   * @return {void}
   */
  handleSliderChange(e, sliderVal) {
    const updatedRotation = (sliderVal - 0.5) * 720;
    this.props.dispatch(updateAndPersist(UPDATE_ROTATION, this.props.targetedId,
      updatedRotation))
  }

  /**
   * Renders the element for display.
   * @returns {HTML} The rendered HTML.
   */
  render() {
    return <Slider
      defaultValue={DEFAULT_SLIDER_POSITION}
      onChange={this.handleSliderChange}
      style={{
        visibility: typeof this.props.targetedId === "undefined"
          ? "hidden" : "visible",
      }} />
  }
}

RotationSlider.propTypes = {
  dispatch: PropTypes.func,
  targetedId: PropTypes.string,
}

const mapStateToProps = state => ({
  targetedId: (state
    .currentCanvasReducer[RC.CURRENT_CANVAS][RC.CANVAS_ACTIVE_ELEMENT]),
});

export default connect(mapStateToProps)(RotationSlider);
