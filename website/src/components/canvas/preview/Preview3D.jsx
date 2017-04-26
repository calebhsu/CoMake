/**
 * @file The 3D previewer component for the canvas.
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';
import ThreeDRotation from 'material-ui/svg-icons/action/three-d-rotation';

import PreviewOptions from './PreviewOptions';

import { CANVAS_ORIENTATION } from '../../../redux/reducers/ReducerConstants';
import { generateScript } from '../../../craftml/ScriptGenerator';
import { ReactCraftMLRenderer } from 'craftml';
import * as CC from '../CanvasConstants';
import * as CodeActions from '../../../redux/actions/CraftmlCodeActions';

import { grey800 } from 'material-ui/styles/colors';

const styles = {
  iconSize: {
    color: grey800,
    height: 48,
    width: 48,
  },
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
    display: 'flex',
    opacity: 0.9,
    position: 'fixed',
    right: 20,
    zIndex: 100,
  },
  previewOptions: {
    zIndex: 100,
  },
  size: {
    height: 96,
    marginBottom: -10,
    marginRight: 6,
    padding: 24,
    width: 96,
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
        <div>
          <Paper
            id={CC.RENDER_WRAPPER_ID}
            style={styles.preview3d}
            zDepth={2}
          >
            <PreviewOptions
              canvas={this.props.canvas}
              currentCanvas={this.props.currentCanvas}
              hasCode={this.props.hasCode}
              hasCanvasImage={this.props.hasCanvasImage}
            />
            <ReactCraftMLRenderer
              code={this.props.craftmlCode} />
          </Paper>
        </div>
      );
    } else {
      return (
        <div style={styles.preview3d}>
          <IconButton
            iconStyle={styles.iconSize}
            style={styles.size}
            tooltip="3D Preview"
            tooltipPosition="top-center"
            touch={true}
          >
            <ThreeDRotation />
          </IconButton>
        </div>
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
