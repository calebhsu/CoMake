/**
 * @file Button component for archiving canvas.
 */

import * as firebase from 'firebase';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Archive from 'material-ui/svg-icons/content/archive';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import * as CanvasActions from '../../../redux/actions/CanvasActions';
import * as RC from '../../../redux/reducers/ReducerConstants';

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
   * Creates a request to remove a canvas from a user's list of canvases
   * @returns {null} Returns nothing
   */
  archiveCanvas() {
    if((!this.props.userId)||(!this.props.canvasId)) {
      return;
    }

    firebase.database().ref(`/users/${this.props.userId}/canvases/${this.props.canvasId}`).once('value')
      .then((canvasSnap) => {
        console.log(canvasSnap);
        document.location = '/#/home';
      });
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
        onClick={this.archiveCanvas}
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

ArchiveCanvas.propTypes = {
  dispatch: PropTypes.func,
  userId: PropTypes.string,
};

const mapStateToProps = (state) => ({
  userId: state.userInfoReducer[RC.USER_INFO][RC.USER_ID],
  canvasId: state.userInfoReducer[RC.CURRENT_CANVAS],
});

export default connect(mapStateToProps)(ArchiveCanvas);
