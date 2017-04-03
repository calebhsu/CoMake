import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Sidebar from './sidebar/Sidebar';
import CanvasView from './CanvasView';
import OptionsBar from './options-bar/OptionsBar';
import Preview3D from './Preview3D';

import * as RC from '../../redux/reducers/ReducerConstants';

/**
 * @classdesc The component encapsulating the whole Canvas page.
 */
class Canvas extends React.Component {

  /**
   * Constructor for the class.
   * @param {Object} props   Props for the component.
   * @returns {void}
   */
  constructor(props) {
    super(props);
  }

  /**
   * Renders the component into HTML.
   * @returns {HTML}    The rendered componenet.
   */
  render() {
    const currentCanvasInfo = this.props.canvases[this.props.currentCanvas];
    return (
      <div>
        <OptionsBar
          canvas={currentCanvasInfo}
          currentCanvas={this.props.currentCanvas}
          elements={this.props.elements}
        />
        <CanvasView
          currentCanvas={this.props.currentCanvas}
          elements={this.props.elements}
          targetedId={this.props.targetedId}
        />
        <Sidebar
          targetedId={this.props.targetedId}
          currentCanvas={this.props.currentCanvas} />
        <Preview3D />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  elements: (state
    .updateElementReducer[RC.ELEMENTS]),
  currentCanvas: (state.canvasReducer[RC.CURRENT_CANVAS]),
  canvases: (state.canvasReducer[RC.CANVASES]),
  targetedId: (state
    .activeElementReducer[RC.ACTIVE_ELEMENT]),
});

Canvas.propTypes = {
  dispatch: PropTypes.func,
  elements: PropTypes.object,
  currentCanvas: PropTypes.string,
  canvases: PropTypes.object,
  targetedId: PropTypes.string,
}

export default connect(mapStateToProps)(Canvas);
