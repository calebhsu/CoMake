/**
 * @file HTML generation for the Home page
 */

import * as firebase from 'firebase';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import CoMakeServices from 'comake-services';
import RaisedButton from 'material-ui/RaisedButton';

import * as CanvasActions from '../../redux/actions/CanvasActions';
import * as RC from '../../redux/reducers/ReducerConstants';
import ServiceEndpoint from '../../ServiceEndpoint'

const CanvasCreationService = CoMakeServices.CanvasCreationService;

class CreateCanvas extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
    
    this.createNewCanvas = this.createNewCanvas.bind(this);
  }

  /**
   * Creates a request for a new canvas.
   * @returns {null} Returns nothing
   */
  createNewCanvas() {
    if(!this.props.userId) {
      return;
    }

    const reqBody = CanvasCreationService.formRequestBody(
      'Untitled',
      this.props.userId,
      []
    );

    CanvasCreationService.sendRequest(reqBody, ServiceEndpoint, (resObj) => {
      this.props.dispatch(CanvasActions.setCurrentCanvas(resObj.newCanvasId));

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
          document.location = '/#/canvas';
        });
    });
  }

  render() {
    return(
  		<span>
        <RaisedButton
          label="New Canvas"
          onClick={this.createNewCanvas}
          secondary={true}
        />
      </span>
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
