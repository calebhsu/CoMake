import React, { Component } from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

const styles = {
  dialogActions: {
    padding: '8px 15px 15px',
  },
  dialogBody: {
    padding: '0 32px 24px',
  },
  actionBtn: {
    marginLeft: 6,
  },
  shareBtn: {
    color: '#FFFFFF',
    fontWeight: 700,
  },
  wrapper: {
    display: 'inline-block',
  },
};

/**
 * Gives HTML for share canvas modal.
 * @returns {HTML}   The HTML of the share canvas modal.
 */
class ShareCanvasModal extends Component {

  /**
   * Constructor for ShareCanvasModal
   * @param {Object} props The props for the ShareCanvasModal.
   */
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  /**
   * Handler for onTouchTap that sets modal's open state to true.
   * @returns {void}
   */
  handleOpen() {
    this.setState({open: true});
  }

  /**
   * Handler for onTouchTap that sets modal's open state to false.
   * @returns {void}
   */
  handleClose() {
    this.setState({open: false});
  }

  /**
   * Renders the modal for display.
   * @returns {HTML} The rendered HTML of the modal.
   */
  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        backgroundColor="#229bc8"
        hoverColor="#0d7faa"
        label="Share"
        labelStyle={styles.shareBtn}
        onTouchTap={this.handleClose}
        style={styles.actionBtn}
      />,
    ];

    return (
      <div style={styles.wrapper}>
        <FlatButton
          backgroundColor="#229bc8"
          hoverColor="#0d7faa"
          label="Share"
          labelStyle={styles.shareBtn}
          onTouchTap={this.handleOpen}
        />
        <Dialog
          actions={actions}
          actionsContainerStyle={styles.dialogActions}
          bodyStyle={styles.dialogBody}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          title="Share Canvas with Others"
        >
          <p>Separate multiple emails with a comma.</p>
          <TextField
            hintText="abc123@email.com"
            floatingLabelText="People"
            floatingLabelFixed={true}
            fullWidth={true}
          />
        </Dialog>
      </div>
    );
  }
}

export default ShareCanvasModal;
