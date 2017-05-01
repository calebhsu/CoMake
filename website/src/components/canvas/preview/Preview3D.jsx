/**
 * @file The 3D previewer component for the canvas.
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import Paper from 'material-ui/Paper';

import ClearPreviewBtn from './ClearPreviewBtn';
import PreviewOptions from './PreviewOptions';
import SaveImgBtn from './SaveImgBtn';

import { CANVAS_ORIENTATION } from '../../../redux/reducers/ReducerConstants';
import { generateScript } from '../../../craftml/ScriptGenerator';
import { ReactCraftMLRenderer } from 'craftml';
import * as CC from '../CanvasConstants';
import * as CodeActions from '../../../redux/actions/CraftmlCodeActions';

const styles = {
  preview3d: {
    bottom: 28,
    display: 'flex',
    opacity: 0.9,
    position: 'fixed',
    right: 20,
    zIndex: 100,
  },
  preview3dPlaceholder: {
    bottom: 28,
    height: 280,
    display: 'flex',
    opacity: 0.9,
    position: 'fixed',
    right: 20,
    width: 320,
    zIndex: 100,
  },
};

/**
 * @classdesc The component that gives a 3D preview of the model.
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
   * If the elements or canvas orientation have changed and auto-render is on then update code.
   * @param {Object} nextProps  The next props to be recieved by the component.
   * @returns {void}
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.autoRender) {
      if (! _.isEqual(this.props.elements, nextProps.elements) ||
          this.props.canvas[CANVAS_ORIENTATION] !== nextProps.canvas[CANVAS_ORIENTATION]) {
            const canvasOrientation = nextProps.canvas ? nextProps.canvas[CANVAS_ORIENTATION] : CC.OVERHEAD_VIEW;
            const newCode = generateScript(nextProps.elements, canvasOrientation);

            this.props.dispatch(CodeActions.setCode(newCode));
      }
    }
  }

  /**
    * Gives HTML for 3D preview component.
    * @returns {HTML}   The HTML of the 3D preview.
   */
  render() {
    if (this.props.craftmlCode !== '') {
      return (
          <Paper
            id={CC.RENDER_WRAPPER_ID}
            style={styles.preview3d}
            zDepth={2}
          >
            <PreviewOptions
              canvas={this.props.canvas}
              currentCanvas={this.props.currentCanvas}
              elements={this.props.elements}
              hasCode={this.props.hasCode}
              hasCanvasImage={this.props.hasCanvasImage}
            />
            <SaveImgBtn
              currentCanvas={this.props.currentCanvas}
              hasCode={this.props.hasCode}
              hasCanvasImage={this.props.hasCanvasImage}
            />
            <ClearPreviewBtn />
            <ReactCraftMLRenderer
              code={this.props.craftmlCode} />
          </Paper>
      );
    } else {
      return (
        <Paper
          style={styles.preview3dPlaceholder}
          zDepth={2}
        >
          <PreviewOptions
            canvas={this.props.canvas}
            currentCanvas={this.props.currentCanvas}
            elements={this.props.elements}
            hasCode={this.props.hasCode}
            hasCanvasImage={this.props.hasCanvasImage}
          />
        </Paper>
      )
    }
  }
}

Preview3D.propTypes = {
  autoRender: PropTypes.bool,
  canvas: PropTypes.object,
  craftmlCode: PropTypes.string,
  currentCanvas: PropTypes.string,
  dispatch: PropTypes.func,
  elements: PropTypes.object,
  hasCanvasImage: PropTypes.bool,
  hasCode: PropTypes.bool,
};

export default connect()(Preview3D);
