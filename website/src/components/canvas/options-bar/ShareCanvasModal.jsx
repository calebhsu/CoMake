/**
 * @file Modal component for sharing canvas with users.
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import CoMakeServices from 'comake-services';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField';
import { white, grey900 } from 'material-ui/styles/colors';

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
  greyBtn: {
    color: grey900,
  },
  shareBtn: {
    color: white,
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
      emailListText: null,
      errorText: null,
      loadingText: '',
      snackbarOpen: false,
    };
    this.shareCanvas = this.shareCanvas.bind(this);
    this.updateEmailListText = this.updateEmailListText.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleSnackbarRequestClose = this.handleSnackbarRequestClose.bind(this);
  }

  /**
   * Shares a canvas with the users found in the emailListText state value
   * Triggered By: Share button onTouchTapEvent
   * @returns {void}
   */
  shareCanvas() {
    if(!this.props.userId || !this.props.currentCanvas
      || !this.state.emailListText)
    {
      return;
    }

    this.setState({errorText: null, loadingText: 'Sharing canvas...'});

    const emailList = this.state.emailListText.split(',').map((email) => {
      return email.trim();
    });

    const reqBody = CanvasSharingService.formPostBody(
       this.props.currentCanvas,
       this.props.userId,
       emailList
    );

    CanvasSharingService.postRequest(reqBody, ServiceEndpoint, (resObj) => {
      if(resObj.usersNotFound && resObj.usersNotFound.length > 0) {

        var usersNotFoundString =
          resObj.usersNotFound.reduce(
            (notFoundEmailList, userEmail) => {
              if(notFoundEmailList) {
                return notFoundEmailList + ', ' + userEmail;
              }
              return 'User(s) were not found: ' + userEmail
            },
              null
          );

         this.setState({errorText: usersNotFoundString, loadingText: ''});
       } else {
         this.handleCloseModal();
         this.setState({loadingText: '', snackbarOpen: true});
       }
     }, () => {
       this.setState({
         errorText: 'There was an error attempting to share the canvas. '
           + 'Try again later.',
         loadingText: ''
       });
     });
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
  handleCloseModal() {
    this.setState({
      emailListText: '',
      errorText: '',
      open: false
    });
  }

  /**
   * Handler for onTouchTap that sets modal's open state to true.
   * @returns {void}
   */
  handleOpenModal() {
    this.setState({open: true});
  }

  /**
   * Handler for onRequestClose that sets snackbar's open state to false.
   * @returns {void}
   */
  handleSnackbarRequestClose() {
      this.setState({snackbarOpen: false});
  }

  /**
   * Renders the share canvas modal for display.
   * @returns {HTML} The rendered HTML of the modal.
   */
  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        labelStyle={styles.greyBtn}
        primary={true}
        onTouchTap={this.handleCloseModal}
      />,
      <FlatButton
        backgroundColor="#e74c49"
        hoverColor="#c7270b"
        label="Share"
        labelStyle={styles.shareBtn}
        onTouchTap={this.shareCanvas}
        style={styles.actionBtn}
      />,
    ];

    return (
      <div style={styles.wrapper}>
        <FlatButton
          backgroundColor="#e74c49"
          hoverColor="#c7270b"
          label="Share"
          labelStyle={styles.shareBtn}
          onTouchTap={this.handleOpenModal}
        />
        <Dialog
          actions={actions}
          actionsContainerStyle={styles.dialogActions}
          bodyStyle={styles.dialogBody}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleCloseModal}
          title="Share Canvas with Others"
        >
          <p>Separate multiple emails with a comma.</p>
          <TextField
            floatingLabelText="People"
            floatingLabelFixed={true}
            fullWidth={true}
            hintText="abc123@email.com"
            onBlur={this.updateEmailListText}
            errorText={this.state.errorText}
          />
        <p>{this.state.loadingText}</p>
        </Dialog>
        <Snackbar
          autoHideDuration={2000}
          message='Canvas shared successfully.'
          onRequestClose={this.handleSnackbarRequestClose}
          open={this.state.snackbarOpen}
        />
      </div>
    );
  }
}

ShareCanvasModal.propTypes = {
  canvases: PropTypes.object,
  currentCanvas: PropTypes.string,
  userId: PropTypes.string,
};

const mapStateToProps = (state) => ({
  userId: state.userInfoReducer[RC.USER_INFO][RC.USER_ID],
});

export default connect(mapStateToProps)(ShareCanvasModal);
