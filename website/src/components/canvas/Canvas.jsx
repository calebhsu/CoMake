import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as firebase from 'firebase';

import { Box } from 'reflexbox';
import Paper from 'material-ui/Paper';
import Sidebar from './Sidebar';
import CanvasView from './CanvasView';
import OptionsBar from './options-bar/OptionsBar';
import Preview3D from './Preview3D';

import * as CanvasActions from '../../redux/actions/CanvasActions';
import * as ElementActions from '../../redux/actions/ElementActions';
import * as RC from '../../redux/reducers/ReducerConstants';


const styles = {
  avatar: {
    marginLeft: 5,
    marginRight: 5,
  },
  box: {
    width: '100%'
  },
  header: {
    backgroundColor: '#49937f',
    color: '#FFFFFF',
    marginTop: 0,
    padding: '15px 10px',
    textTransform: 'uppercase',
  },
  modelName: {
    float: 'left',
    marginLeft: 15,
  },
  optionBtn: {
    marginTop: 10,
  },
  optionBtnGroup: {
    float: 'left',
    marginLeft: 20,
    marginRight: 10,
  },
  paper: {
    display: 'inline-block',
    height: 50,
    textAlign: 'center',
    width: '100%',
  },

};

/**
 * @classdesc The component encapsulating the whole Canvas page.
 */
class Canvas extends React.Component {

  /**
   * Constructor for the class.
   * @param {Object} props   Props for the component.
   * @returns {void}
   */
  constructor(props) {
    super(props);
    this.hasInitialized = false;

    this.fetchAndListenForCanvasInfo = this.fetchAndListenForCanvasInfo.bind(this);
    this.fetchCanvasInfo = this.fetchCanvasInfo.bind(this);
  }

  /**
   * Initializes the canvas info and element list for the current canvas and
   * sets up listeners to monitor canvas/element changes. Should only be called
   * the first time (at time of or after mounting) that a valid currentCanvas
   * string is passed into the props
   * @param {string} canvasId The canvas ID to collect element info for
   * @returns {void}
   */
  fetchAndListenForCanvasInfo(canvasId) {
    this.fetchCanvasInfo(canvasId);
    this.listenForCanvasInfo(canvasId);
  }

  /**
   * Fetches information in canvas (metadata and elements) and dispatches actions.
   * @param {String} canvasId The ID for the canvas.
   * @returns {void}
   */
  fetchCanvasInfo(canvasId) {
    firebase.database().ref(`/canvases/${canvasId}`).once('value')
      .then((canvasSnap) => {
        //fetch canvas specific info
        const canvasObj = {};
        canvasObj[RC.CANVAS_NAME] = canvasSnap.child('name').val();
        canvasObj[RC.CANVAS_OWNER] = canvasSnap.child('owner').val();

        let canvasUsersObj = canvasSnap.child('users').val();
        if(!canvasUsersObj) {
          canvasUsersObj = {};
        }

        canvasObj[RC.CANVAS_USERS] = canvasUsersObj;

        this.props.dispatch(CanvasActions.addCanvas(canvasId, canvasObj));

        //fetch canvas element info
        let firebaseElemList = canvasSnap.child(RC.ELEMENTS).val();
        if(!firebaseElemList) {
          firebaseElemList = {};
        }

        this.props.dispatch(ElementActions.initElements(firebaseElemList));
    });
  }

  /**
   * Sets up listeners for fields on the canvas specified by canvasId
   * @param {string} canvasId The id for the canvas to listen for changes on
   * @returns {void}
   */
  listenForCanvasInfo(canvasId) {
    //listen for canvas metadata
    firebase.database().ref(`${RC.CANVASES}/${canvasId}/${RC.CANVAS_NAME}`)
      .on('value', (snap) => {
        this.props.dispatch(
          CanvasActions.setCanvasName(canvasId, snap.val())
        );
      });
    firebase.database().ref(`${RC.CANVASES}/${canvasId}/${RC.CANVAS_USERS}`)
      .on('child_added', (snap) => {
        this.props.dispatch(
          CanvasActions.addCanvasUser(canvasId, snap.key, snap.val())
        );
      });

    //listen for element info
    firebase.database().ref(`${RC.CANVASES}/${canvasId}/${RC.ELEMENTS}`)
      .on('child_added', (elemSnap) => {
        this.props.dispatch(ElementActions.addElement(elemSnap.key,
          elemSnap.val()));
      });
    firebase.database().ref(`${RC.CANVASES}/${canvasId}/${RC.ELEMENTS}`)
    .on('child_changed', (elemSnap) => {
        this.props.dispatch(ElementActions.addElement(elemSnap.key,
          elemSnap.val()));
      });
    firebase.database().ref(`${RC.CANVASES}/${canvasId}/${RC.ELEMENTS}`)
      .on('child_removed', (elemSnap) => {
        this.props.dispatch(ElementActions.removeElement(elemSnap.key));
      });

    this.hasInitialized = true;
  }

  /**
   * Function to automatically be performed once the component mount.
   * Used here to initialize canvas elements if not done and if the new canvas id
   * is not null
   * @returns {void}
   */
  componentDidMount() {
    if(!this.hasInitialized && this.props.currentCanvas) {
      this.fetchAndListenForCanvasInfo(this.props.currentCanvas);
    }
  }

  /**
   * Function to automatically be performed once the component receives new props.
   * Used here to initialize canvas elements if not done and if the new canvas id
   * is not null
   * @param {Object} nextProps The new props object to be given to the component
   * @returns {void}
   */
  componentWillReceiveProps(nextProps) {
    if(!this.hasInitialized && nextProps.currentCanvas) {
      this.fetchAndListenForCanvasInfo(nextProps.currentCanvas);
    }
  }

  /**
   * After we unmount the canvas stop listening to the elements.
   * @returns {void}
   */
  componentWillUnmount() {
    if(this.props.currentCanvas) {
      firebase.database().ref(`${RC.CANVASES}/${this.props.currentCanvas}`).off();
    }

    this.hasInitialized = false;
  }

  /**
   * Renders the component into HTML.
   * @returns {HTML}    The rendered componenet.
   */
  render() {
    const currentCanvasInfo = this.props.canvases[this.props.currentCanvas];
    return (
      <div>
        <Box style={styles.box} col={9} sm={12} md={9}>
          <Paper style={styles.paper} zDepth={4}>
          <OptionsBar
            canvas={currentCanvasInfo}
            currentCanvas={this.props.currentCanvas}
            elements={this.props.elements} />
          </Paper>
        </Box>
        <CanvasView
          currentCanvas={this.props.currentCanvas}
          elements={this.props.elements}
        />
        <Sidebar
          targetedId={this.props.targetedId}
          currentCanvas={this.props.currentCanvas} />
        <Preview3D />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  elements: (state.updateElementReducer[RC.ELEMENTS]),
  currentCanvas: (state.canvasReducer[RC.CURRENT_CANVAS]),
  canvases: (state.canvasReducer[RC.CANVASES]),
  targetedId: (state.activeElementReducer[RC.ACTIVE_ELEMENT]),
});

Canvas.propTypes = {
  dispatch: PropTypes.func,
  elements: PropTypes.object,
  currentCanvas: PropTypes.string,
  canvases: PropTypes.object,
  targetedId: PropTypes.string,
}

export default connect(mapStateToProps)(Canvas);
