/**
 * @file HTML generation for the canvas list
 */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as firebase from 'firebase';

import { Grid, Flex, Box } from 'reflexbox';
import { Card, CardHeader, CardMedia } from 'material-ui/Card';
import { Link } from 'react-router';
import * as RC from '../../redux/reducers/ReducerConstants';
import * as CanvasActions from '../../redux/actions/CanvasActions';
import * as FBStorageHelper from '../../helpers/FirebaseStorageHelper';
import placeholderImage from '../../img/placeholder.png';

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
    this.fetchCanvasInfo = this.fetchCanvasInfo.bind(this);
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
    // If there is a valid username, fetch available canvas names.
    firebase.database().ref('/users').child(userId)
      .child(RC.CANVASES).once('value').then((canvasListSnap) => {
        if(canvasListSnap.val()) {
          Object.keys(canvasListSnap.val()).forEach((canvasId) => {
            if ((Object.keys(this.props.canvases).indexOf(canvasId) < 0)
                && (canvasListSnap.val()[canvasId])) {
              this.fetchCanvasInfo(canvasId);
            }
          });
        }
    });

    // Listen for any new canvases that might be added.
    firebase.database().ref('/users').child(userId)
      .child(RC.CANVASES).on('child_added', (canvasSnap) => {
        if (canvasSnap.val()) {
          this.fetchCanvasInfo(canvasSnap.key);
        }
      });

    // Listen for any canvases that might be removed.
    firebase.database().ref('/users').child(userId)
      .child(RC.CANVASES).on('child_changed', (canvasSnap) => {
        if (!canvasSnap.val()) {
          this.props.dispatch(CanvasActions.removeCanvas(canvasSnap.key));
        }
      });
    this.listenersAttached = true;
  }

  /**
   * Fetches information in canvas and dispatches action to update meta data.
   * @param {String} canvasId The ID for the canvas.
   * @returns {void}
   */
  fetchCanvasInfo(canvasId) {
    firebase.database().ref(`/canvases/${canvasId}`).once('value')
      .then((canvasSnap) => {
        const canvasObj = {};
        canvasObj[RC.CANVAS_NAME] = canvasSnap.child('name').val();
        canvasObj[RC.CANVAS_OWNER] = canvasSnap.child('owner').val();

        let canvasUsersObj = canvasSnap.child('users').val();
        if(!canvasUsersObj) {
          canvasUsersObj = {};
        }
        canvasObj[RC.CANVAS_USERS] = canvasUsersObj;


        if (canvasSnap.child(RC.CANVAS_IMAGE).val()) {
          FBStorageHelper.getRenderedImageUrl(canvasId, (url) => {
            canvasObj[RC.CANVAS_IMAGE] = url;
            this.props.dispatch(CanvasActions.addCanvas(canvasId, canvasObj));
          });
        } else {
          canvasObj[RC.CANVAS_IMAGE] = null;
          this.props.dispatch(CanvasActions.addCanvas(canvasId, canvasObj));
        }
    });
  }

  /**
   * Creates a click handler to handle the selection of a canvas.
   * @param {string} canvasId the ID to create the click handler for.
   * @returns {Function} A click handler for the specified canvasId
   */
  createClickHandler(canvasId) {
    return () => {
      this.props.dispatch(CanvasActions.setCurrentCanvas(canvasId));
    };
  }

  /**
   * Generates HTML for the user canvas list.
   * @returns {canvasList}  The array holding the canvas list HTML.
   */
  render() {
    const canvasList = [];

    Object.keys(this.props.canvases).forEach((canvasId, i) => {
      let canvasImage = this.props.canvases[canvasId][RC.CANVAS_IMAGE];
      if (!canvasImage) {
        // set to default image.
        canvasImage = placeholderImage;
      }
      canvasList.push(
        <Box
          col={12}
          sm={3}
          key={i}
          style={styles.models}
        >
          <Link to="/canvas">
            <Card onTouchTap={this.createClickHandler(canvasId)}>
              <CardMedia
                overlay={<CardHeader title={this.props.canvases[canvasId][RC.CANVAS_NAME]} />}
                overlayContentStyle={styles.overlay} >
                <img src={canvasImage} className={'img-responsive'} />
              </CardMedia>
            </Card>
          </Link>
        </Box>
      )
    });

    return (
      <Grid col={10} mt={3}>
        <Flex
          mt={3}
          mb={2}
          justify="flex-end"
          wrap
        >
          {canvasList}
        </Flex>
      </Grid>
    );
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
