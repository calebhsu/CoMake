/**
 * @file The 3D rendering button component for the 3D previewer.
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import IconButton from 'material-ui/IconButton';
import ThreeDRotation from 'material-ui/svg-icons/action/three-d-rotation';

import { CANVAS_ORIENTATION } from '../../../redux/reducers/ReducerConstants';
import { generateScript } from '../../../craftml/ScriptGenerator';
import * as CC from '../CanvasConstants';
import * as CodeActions from '../../../redux/actions/CraftmlCodeActions';

import { grey800 } from 'material-ui/styles/colors';

const styles = {
  iconSize: {
    color: grey800,
    height: 32,
    padding: 3,
    width: 32,
  },
  size: {
    display: 'block',
    height: 64,
    padding: 16,
    width: 64,
  },
};

/**
 * @classdesc The component that gives a 3D preview of the model.
 */
class Render3DBtn extends React.Component {

  /**
   * constructor for the Sidebar.
   * @param {Object} props The props to be passed in.
   */
  constructor(props) {
    super(props);
    this.updateCraftmlCode = this.updateCraftmlCode.bind(this);
  }

  /**
   * Handler for updating craftml code (triggers 3D rerender).
   * @returns {void}
   */
  updateCraftmlCode() {
    const newCode = generateScript(this.props.elements, this.props.canvas[CANVAS_ORIENTATION]);
    this.props.dispatch(CodeActions.setCode(newCode));
  }


  /**
    * Gives HTML for 3D preview component.
    * @returns {HTML}   The HTML of the 3D preview.
   */
  render() {
    return (
        <IconButton
          key={CC.RENDER_BUTTON}
          iconStyle={styles.iconSize}
          onClick={this.updateCraftmlCode}
          style={styles.size}
          tooltip="3D Preview"
          tooltipPosition="bottom-left"
          touch={true}
        >
          <ThreeDRotation />
        </IconButton>
    )
  }
}

Render3DBtn.propTypes = {
  autoRender: PropTypes.bool,
  canvas: PropTypes.object,
  dispatch: PropTypes.func,
  elements: PropTypes.object,
  hasCode: PropTypes.bool,
};

export default connect()(Render3DBtn);
