/**
 * @file Modal component for displaying exported code.
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import CopyToClipboard from 'react-copy-to-clipboard';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField';
import { white, grey900 } from 'material-ui/styles/colors';

import { CANVAS_ORIENTATION } from '../../../redux/reducers/ReducerConstants';
import {
  generateOverheadScript,
  generateSideScript
} from '../../../craftml/ScriptGenerator';
import * as CC from '../CanvasConstants';

const styles = {
  actionBtn: {
    color: white,
  },
  greyBtn: {
    color: grey900,
  },
  dialogActions: {
    padding: '8px 15px 15px',
  },
  dialogBody: {
    padding: '0 32px 24px',
  },
  wrapper: {
    display: 'inline-block',
  },
};

/**
 * Gives HTML for code export modal.
 * @returns {HTML}   The HTML of the export modal.
 */
class ExportModal extends Component {

  /**
   * Constructor for ExportModal
   * @param {Object} props The props for the ExportModal.
   */
  constructor(props) {
    super(props);
    this.state = {
      craftScript: '',
      copied: false,
      dialogOpen: false,
      snackbarOpen: false,
    };
    this.copyCraftScript = this.copyCraftScript.bind(this);
    this.generateCraftScript = this.generateCraftScript.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
    this.handleDialogOpen = this.handleDialogOpen.bind(this);
    this.handleSnackbarRequestClose = this.handleSnackbarRequestClose.bind(this);
  }

  /**
  * Handler for onCopy that sets copied & snackbar open state to true.
  * @returns {void}
  */
  copyCraftScript() {
    this.setState({
      copied: true,
      snackbarOpen: true
    })
  }

  /**
  * Generates CraftML script for element positions in top-down view &
  * opens the modal to display script.
  * @returns {void}
  */
  generateCraftScript() {
    let craftScript = '';

    if (this.props.canvas &&
        this.props.canvas[CANVAS_ORIENTATION] === CC.OVERHEAD_VIEW) {
          craftScript = generateOverheadScript(this.props.elements)
    }
    else {
      craftScript = generateSideScript(this.props.elements)
    }

    this.setState({
      craftScript: craftScript
    });
    this.handleDialogOpen();
  }

  /**
  * Handler for onTouchTap that sets dialog's open state to false.
  * @returns {void}
  */
  handleDialogClose() {
    this.setState({dialogOpen: false});
  }

  /**
   * Handler for onTouchTap that sets dialog's open state to true.
   * @returns {void}
   */
  handleDialogOpen() {
    this.setState({dialogOpen: true});
  }

  /**
   * Handler for onRequestClose that sets snackbar's open state to false.
   * @returns {void}
   */
  handleSnackbarRequestClose() {
    this.setState({snackbarOpen: false});
  }

  /**
   * Renders the exported code modal for display.
   * @returns {HTML} The rendered HTML of the trigger button and modal.
   */
  render() {
  const actions = [
    <FlatButton
      label="Close"
      labelStyle={styles.greyBtn}
      onTouchTap={this.handleDialogClose}
      primary={true}
    />,
    <CopyToClipboard
      onCopy={this.copyCraftScript}
      text={this.state.craftScript}
      >
        <FlatButton
          backgroundColor="#e74c49"
          hoverColor="#c7270b"
          label="Copy"
          labelStyle={styles.actionBtn}
          onTouchTap={this.handleDialogClose}
          primary={true}
        />
      </CopyToClipboard>
    ];

    return (
      <div style={styles.wrapper}>
        <FlatButton
          label="Export"
          labelStyle={styles.greyBtn}
          onTouchTap={this.generateCraftScript}
        />
        <Dialog
          actions={actions}
          actionsContainerStyle={styles.dialogActions}
          bodyStyle={styles.dialogBody}
          modal={false}
          open={this.state.dialogOpen}
          onRequestClose={this.handleDialogClose}
          title="Generated CraftML Code"
        >
          <TextField
            fullWidth={true}
            hintText="<g></g>"
            multiLine={true}
            rows={5}
            value={this.state.craftScript}
          />
        </Dialog>
        <Snackbar
          autoHideDuration={4000}
          message="Copied to your clipboard."
          onRequestClose={this.handleSnackbarRequestClose}
          open={this.state.snackbarOpen}
        />
      </div>
    );
  }
}

ExportModal.propTypes = {
  canvas: PropTypes.object,
  elements: PropTypes.object,
}

export default connect()(ExportModal);
