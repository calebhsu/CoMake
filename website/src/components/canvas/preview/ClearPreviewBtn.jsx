/**
 * @file The clear 3D preview button component for the 3D previewer.
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Clear from 'material-ui/svg-icons/content/clear';
import IconButton from 'material-ui/IconButton';

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
    bottom: 0,
    display: 'block',
    height: 64,
    padding: 10,
    position: 'absolute',
    right: 0,
    width: 64,
    zIndex: 200,
  },
};

/**
 * @classdesc The button that clears the 3D preview of the model.
 */
class ClearPreviewBtn extends React.Component {

  /**
   * Constructor for the clear preview button.
   * @param {Object} props The props to be passed in.
   */
  constructor(props) {
    super(props);

    this.clearCraftmlCode = this.clearCraftmlCode.bind(this);
  }

  /**
   * Handler for clearing the 3D model i.e. clearing the CraftML code.
   * @returns {void}
   */
  clearCraftmlCode() {
    this.props.dispatch(CodeActions.setCode(''));
  }

  /**
    * Gives HTML for ClearPreviewBtn.
    * @returns {HTML}   The HTML of the clear 3D preview button.
   */
  render() {
    return (
        <IconButton
          iconStyle={styles.iconSize}
          onClick={this.clearCraftmlCode}
          style={styles.size}
          tooltip="Reset Preview"
          tooltipPosition="top-center"
          touch={true}
        >
          <Clear />
        </IconButton>
    )
  }
}

ClearPreviewBtn.propTypes = {
  dispatch: PropTypes.func,
};

export default connect()(ClearPreviewBtn);
