/**
 * @file Button component for archiving canvas.
 */

import React, { Component } from 'react';

import Archive from 'material-ui/svg-icons/content/archive';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

const styles = {
  actionBtn: {
    marginLeft: 6,
  },
  archiveBtn: {
    float: 'right',
    marginTop: 10,
  },
};

/**
 * Gives HTML for archive canvas button & modal.
 * @returns {HTML}   The HTML of the export button & modal.
 */
class ArchiveCanvas extends Component {
  constructor(props) {
    super(props)
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
  handleOpen = () => {
    this.setState({open: true});
  };

  /**
   * Handler for onTouchTap that sets modal's open state to true.
   * @returns {void}
   */
  handleClose = () => {
    this.setState({open: false});
  };

  /**
   * Renders the archive canvas button for display.
   * @returns {HTML} The rendered HTML of the archive canvas button.
   */
  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Archive"
        onTouchTap={this.handleClose}
        style={styles.actionBtn}
      />,
    ];

    return (
      <div>
        <FlatButton
          icon={<Archive />}
          label="Archive Canvas"
          onTouchTap={this.handleOpen}
          style={styles.archiveBtn}
        />
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          Are you sure you want to archive this canvas? This cannot be undone.
        </Dialog>
      </div>
    );
  }
}

export default ArchiveCanvas;
