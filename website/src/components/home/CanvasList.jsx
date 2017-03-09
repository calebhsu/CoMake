/**
 * @file HTML generation for the canvas list
 */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as firebase from 'firebase';

import { Box } from 'reflexbox';
import { Card, CardHeader, CardMedia } from 'material-ui/Card';
import { Link } from 'react-router';
import * as RC from '../../redux/reducers/ReducerConstants';
import * as CanvasActions from '../../redux/actions/CanvasActions';

const styles = {
  models: {
    display: 'inline-block',
    margin: 10,
  },
  overlay: {
    padding: 0,
    margin: 'auto',
  },
};

const generateCanvasCode = (
  <img src="https://res.cloudinary.com/craftml/image/upload/w_250,h_250,c_fill/v1440024165/4yUaf.png" className='img-responsive' />
);


/**
 * @classdesc Component for displaying list of available canvases.
 */
class CanvasList extends React.Component {
  /**
   * Constructor for CanvasList.
   * @param {Object} props The prop list for this component.
   * @returns {void}
   */
  constructor(props) {
    super(props);
    // Keeps track of whether we have attached listeners yet.
    this.listenersAttached = false;
    this.collectAndListenForCanvases = this.collectAndListenForCanvases.bind(this);
    this.createClickHandler = this.createClickHandler.bind(this);
  }

  /**
   * When component mounts, if user ID is present, look up canvases from Firebase.
   * @returns {void}
   */
  componentDidMount() {
    if (!this.listenersAttached && this.props.userId) {
      this.collectAndListenForCanvases(this.props.userId);
    }
  }

  /**
   * When CanvasList recieves uid, perform look up canvases from Firebase.
   * @param {Object} nextProps The next props to be passed to the component.
   * @returns {void}
   */
  componentWillReceiveProps(nextProps) {
    if (!this.listenersAttached && nextProps.userId) {
      this.collectAndListenForCanvases(nextProps.userId);
    }
  }

  /**
  * Stop listening for new canvases to be added once we leave home page.
  * @returns {void}
  */
 componentWillUnmount() {
    if (this.props.userId){
      firebase.database().ref('/users').child(this.props.userId)
        .child(RC.CANVASES).off()
    }

    this.listenersAttached = false;
  }

  /**
   * Collects all canvases for userId and then listens for new canvases.
   * @param {string} userId the user ID to look up canvases for
   * @returns {void}
   */
  collectAndListenForCanvases(userId) {
    // Helper function that will add just canvas id/name
    const addCanvasHelper = (canvasId, canvasName) => {
      // Check if the canvas has already been added.
      const canvasKeys = Object.keys(this.props.canvases);
      if (canvasKeys.indexOf(canvasId) >= 0) {
        return;
      }
      // Otherwise dispatch action to add the canvas with just the name.
      const actionPayload = {};
      actionPayload[RC.CANVAS_NAME] = canvasName
      this.props.dispatch(CanvasActions.addCanvas(canvasId, actionPayload));
    }

  // If there is a valid username, fetch available canvas names.
  firebase.database().ref('/users').child(userId)
    .child(RC.CANVASES).once('value').then((canvasListSnap) => {
      Object.keys(canvasListSnap.val()).forEach((canvasId) => {
        addCanvasHelper(canvasId, canvasListSnap.child(canvasId).val());
    });
    });

    // Listen for any new canvases that might be added.
    firebase.database().ref('/users').child(userId)
      .child(RC.CANVASES).on('child_added', (canvasSnap) => {
        addCanvasHelper(canvasSnap.key, canvasSnap.val());
      });
    this.listenersAttached = true;
  }

  /**
   * Creates a click handler to handle the selection of a canvas.
   * @param {string} canvasId the ID to create the click handler for.
   * @returns {Function} A click handler for the specified canvasId
   */
  createClickHandler(canvasId) {
    return () => {
      this.props.dispatch(CanvasActions.setCurrentCanvas(canvasId));
      firebase.database().ref(`/canvases/${canvasId}`).once('value')
        .then((canvasSnap) => {
          const canvasObj = {};
          canvasObj[RC.CANVAS_NAME] = canvasSnap.child('name').val();
          canvasObj[RC.CANVAS_OWNER] = canvasSnap.child('owner').val();
          canvasObj[RC.CANVAS_USERS] = canvasSnap.child('users').val();

          this.props.dispatch(CanvasActions.addCanvas(canvasId, canvasObj));
        });
    };
  }

  /**
   * Generates HTML for the user canvas list.
   * @returns {canvasList}  The array holding the canvas list HTML.
   */
  render() {
    const canvasList = [];

    Object.keys(this.props.canvases).forEach((canvasId, i) => {
      canvasList.push(
        <Box style={styles.models} key={i}>
          <Link to="/canvas">
            <Card onTouchTap={this.createClickHandler(canvasId)}>
              <CardMedia
                overlay={<CardHeader title={this.props.canvases[canvasId][RC.CANVAS_NAME]} />}
                overlayContentStyle={styles.overlay}
                >
                {generateCanvasCode}
              </CardMedia>
            </Card>
          </Link>
        </Box>
      )
    });

    return (<div> {canvasList} </div>);
  }
}

CanvasList.propTypes = {
  dispatch: PropTypes.func,
  canvases: PropTypes.object,
  userId: PropTypes.string,
}

const mapStateToProps = state => ({
  canvases: (state.canvasReducer[RC.CANVASES]),
  userId: (state.userInfoReducer[RC.USER_INFO][RC.USER_ID]),
});

export default connect(mapStateToProps)(CanvasList);
