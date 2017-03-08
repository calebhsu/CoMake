/**
 * @file Modal component for displaying exported code.
 */

import React, { Component } from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

const styles = {
  copyBtn: {
    color: '#FFFFFF',
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
      open: false,
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
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
        backgroundColor="#229bc8"
        hoverColor="#0d7faa"
        label="Copy"
        primary={true}
        onTouchTap={this.handleClose}
        style={styles.copyBtn}
      />
    ];

    return (
      <div style={styles.wrapper}>
        <FlatButton
          label="Export"
          onTouchTap={this.handleOpen}
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
          />
        </Dialog>
      </div>
    );
  }
}

export default ExportModal;
