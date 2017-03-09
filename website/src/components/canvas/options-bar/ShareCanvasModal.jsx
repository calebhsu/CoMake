/**
 * @file Modal component for sharing canvas with users.
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import CoMakeServices from 'comake-services';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import * as RC from '../../../redux/reducers/ReducerConstants';
import ServiceEndpoint from '../../../ServiceEndpoint';

const CanvasSharingService = CoMakeServices.CanvasSharingService;

const styles = {
  actionBtn: {
    marginLeft: 6,
  },
  dialogActions: {
    padding: '8px 15px 15px',
  },
  dialogBody: {
    padding: '0 32px 24px',
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
      emailListText: null
    };
    this.shareCanvas = this.shareCanvas.bind(this);
    this.updateEmailListText = this.updateEmailListText.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
  }

  /**
   * Shares a canvas with the users found in the emailListText state value
   * Triggered By: Share button onTouchTapEvent
   * @returns {void}
   */
  shareCanvas() {
    if(!this.props.userId || !this.props.currentCanvasId) {
     return;
    }

     const emailList = this.state.emailListText.split(',').map((email) => {
       return email.trim();
     });

     const reqBody = CanvasSharingService.formRequestBody(
       this.props.currentCanvasId,
       this.props.userId,
       emailList
     );

     CanvasSharingService.sendRequest(reqBody, ServiceEndpoint, (resObj) => {
       console.log(resObj);
     });

     this.handleClose();
   }

  /**
   * Updates the emailListText state value
   * Triggered By: TextField onBlur event
   * @param {Event} event the onBlur event from the TextField element
   * @returns {void}
   */
   updateEmailListText(event) {
     this.setState({emailListText: event.target.value});
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
   * Renders the share canvas modal for display.
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
        onTouchTap={this.shareCanvas}
        style={styles.actionBtn}
      />,
    ];

    console.log(this.props);

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
            floatingLabelText="People"
            floatingLabelFixed={true}
            fullWidth={true}
            hintText="abc123@email.com"
            onBlur={this.updateEmailListText}
          />
        </Dialog>
      </div>
    );
  }
}

ShareCanvasModal.propTypes = {
  canvases: PropTypes.object,
  currentCanvasId: PropTypes.string,
  userId: PropTypes.string,
};

const mapStateToProps = (state) => ({
  canvases: state.canvasReducer[RC.CANVASES],
  currentCanvasId: state.canvasReducer[RC.CURRENT_CANVAS],
  userId: state.userInfoReducer[RC.USER_INFO][RC.USER_ID],
});

export default connect(mapStateToProps)(ShareCanvasModal);
