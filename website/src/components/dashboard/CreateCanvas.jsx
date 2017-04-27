/**
 * @file HTML generation for the Home page
 */

import * as firebase from 'firebase';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import CoMakeServices from 'comake-services';
import LoadingIndicator from '../LoadingIndicator';
import RaisedButton from 'material-ui/RaisedButton';

import * as CanvasActions from '../../redux/actions/CanvasActions';
import * as RC from '../../redux/reducers/ReducerConstants';
import ServiceEndpoint from '../../ServiceEndpoint'

const CanvasCreationService = CoMakeServices.CanvasCreationService;

const styles = {
  createBtn: {
    marginTop: 15,
  }
};

/**
 * Gives HTML for new canvas button.
 * @returns {HTML}   The HTML of the new canvas button.
 */
class CreateCanvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };

    this.createNewCanvas = this.createNewCanvas.bind(this);
    this.handleLoadingShow = this.handleLoadingShow.bind(this);
  }

  /**
   * Creates a request for a new canvas.
   * @returns {null} Returns nothing
   */
  createNewCanvas() {
    if(!this.props.userId) {
      return;
    }

    this.handleLoadingShow();

    const reqBody = CanvasCreationService.formRequestBody(
      'Untitled',
      this.props.userId,
      []
    );

    CanvasCreationService.sendRequest(reqBody, ServiceEndpoint, (resObj) => {
      firebase.database().ref(`/canvases/${resObj.newCanvasId}`).once('value')
        .then((canvasSnap) => {
          const canvasObj = {};
          canvasObj[RC.CANVAS_NAME] = canvasSnap.child('name').val();
          canvasObj[RC.CANVAS_OWNER] = canvasSnap.child('owner').val();

          let canvasUsersObj = canvasSnap.child('users').val();
          if(!canvasUsersObj) {
            canvasUsersObj = {};
          }
          canvasObj[RC.CANVAS_USERS] = canvasUsersObj;

          this.props.dispatch(CanvasActions.addCanvas(resObj.newCanvasId, canvasObj));
          document.location = `/#/canvas/${resObj.newCanvasId}`;
        });
    });
  }

  /**
  * Handler for LoadingIndicator that sets loading display state to true.
  * @returns {void}
  */
  handleLoadingShow(){
    this.setState({loading: true});
  }

  render() {
    return(
      <div>
        { this.state.loading ? <LoadingIndicator /> : null }
        <RaisedButton
          label="New Canvas"
          onClick={this.createNewCanvas}
          secondary={true}
          style={styles.createBtn}
        />
      </div>
    )
  }
}

CreateCanvas.propTypes = {
  dispatch: PropTypes.func,
  userId: PropTypes.string,
};

const mapStateToProps = (state) => ({
  userId: state.userInfoReducer[RC.USER_INFO][RC.USER_ID],
});

export default connect(mapStateToProps)(CreateCanvas);
