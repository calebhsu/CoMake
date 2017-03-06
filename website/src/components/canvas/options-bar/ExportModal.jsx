/**
 * @file Modal component for displaying exported code.
 */

import React, { Component } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField';

import { generateScript } from '../../../craftml/ScriptGenerator';

const styles = {
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

const TEST_ELEMENTS = {
  element1: {
    position: {
      x: 100,
      y: 200,
    },
    size: {
      width: 30,
      height: 50,
    },
    rotation: 0,
    module: 'AoN5x',
  },
  element2: {
    position: {
      x: 400,
      y: 500,
    },
    size: {
      width: 100,
      height: 100,
    },
    rotation: 30,
    module: 'Baxrz',
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
    this.setState({
      craftScript: generateScript(TEST_ELEMENTS)
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
      onTouchTap={this.handleDialogClose}
      primary={true}
    />,
    <CopyToClipboard
      onCopy={this.copyCraftScript}
      text={this.state.craftScript}
      >
        <FlatButton
          label="Copy"
          onTouchTap={this.handleDialogClose}
          primary={true}
        />
      </CopyToClipboard>
    ];

    return (
      <div style={styles.wrapper}>
        <FlatButton
          label="Export"
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

export default ExportModal;
