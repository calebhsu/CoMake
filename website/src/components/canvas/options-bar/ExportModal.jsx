/**
 * @file Modal component for displaying exported code.
 */

import React, { Component } from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
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
      open: false,
    };
    this.generateCraftScript = this.generateCraftScript.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
  }

  /**
  * Generates CraftML script for element positions in top-down view.
  * @returns {void}
  */
  generateCraftScript() {
    this.setState({
      craftScript: generateScript(TEST_ELEMENTS)
    });
    this.handleOpen();
  }

  /**
  * Handler for onTouchTap that sets modal's open state to false.
  * @returns {void}
  */
  handleClose() {
    this.setState({open: false});
  }

  /**
   * Handler for onTouchTap that sets modal's open state to true.
   * @returns {void}
   */
  handleOpen() {
    this.setState({open: true});
  }

  /**
   * Renders the exported code modal for display.
   * @returns {HTML} The rendered HTML of the modal.
   */
  render() {
    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Copy"
        primary={true}
        onTouchTap={this.handleClose}
      />
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
          open={this.state.open}
          onRequestClose={this.handleClose}
          title="Generated CraftML Code"
        >
          <TextField
            fullWidth={true}
            multiLine={true}
            rows={5}
            value={this.state.craftScript}
          />
        </Dialog>
      </div>
    );
  }
}

export default ExportModal;
