/**
 * @file The entire canvas page containing canvas, sidebar, etc.
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as firebase from 'firebase';

import Sidebar from './sidebar/Sidebar';
import CanvasView from './CanvasView';
import OptionsBar from './options-bar/OptionsBar';
import Preview3D from './Preview3D';
import LoadingIndicator from '../LoadingIndicator';
import CanvasError from './CanvasError';
import * as ElementActions from '../../redux/actions/ElementActions';
import * as ActiveElementActions from '../../redux/actions/ActiveElementActions';
import * as CodeActions from '../../redux/actions/CraftmlCodeActions';
import * as CanvasActions from '../../redux/actions/CanvasActions';
import * as RC from '../../redux/reducers/ReducerConstants';

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
    this.state = {
      validId: null,
    };

    this.fetchAndListenForCanvasInfo = this.fetchAndListenForCanvasInfo.bind(this);
    this.processCanvasInfo = this.processCanvasInfo.bind(this);
  }

  /**
   * Function to automatically be performed once the component mount.
   * Used here to initialize canvas elements if not done and if the new canvas id
   * is not null
   * @returns {void}
   */
  componentDidMount() {
    this.fetchAndListenForCanvasInfo(this.props.params.canvasId);
  }

  /**
   * Check the new props to see if the canvasId has changed, if so reload.
   * @param {Object} nextProps The new props being passed into the function.
   * @returns {void}
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.params.canvasId !== this.props.params.canvasId) {
      if(this.state.validId) {
        firebase.database().ref(`${RC.CANVASES}/${this.props.params.canvasId}`).off();
      }
      this.setState({
        validId: null,
      });
      this.fetchAndListenForCanvasInfo(nextProps.params.canvasId);
    }
  }

  /**
   * After we unmount the canvas stop listening to the elements and clear redux.
   * @returns {void}
   */
  componentWillUnmount() {
    if(this.state.validId) {
      firebase.database().ref(`${RC.CANVASES}/${this.props.params.canvasId}`).off();
    }
    this.props.dispatch(ActiveElementActions.targetElement(null));
    this.props.dispatch(ElementActions.initElements({}));
    this.props.dispatch(CodeActions.setCode(''));
    this.props.dispatch(CodeActions.setAutoCodeUpdate(false));
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
    // Write a promise that first checks if the canvasID in url is valid.
    // Resolves a CanvasSnap if it is correct.
    const checkForExistance = new Promise((resolve, reject) => {
      firebase.database().ref(`/canvases/${canvasId}`).once('value')
        .then((canvasSnap) => {
          if (canvasSnap.val() !== null) {
            resolve(canvasSnap);
          } else {
            reject('Canvas does not exist.')
          }
        }).catch((err) => {
          reject(err);
        })
    });
    // Call the promise, if successful load in canvas info and start listening.
    checkForExistance.then((canvasSnap) => {
      this.setState({
        validId: true,
      });
      this.processCanvasInfo(canvasId, canvasSnap);
      this.listenForCanvasInfo(canvasId);
    }).catch((err) => {
      console.error(err);
      this.setState({
        validId: false,
      });
    });
  }

  /**
   * Processes the fetched canvas info.
   * @param {String} canvasId The ID for the canvas.
   * @param {Object} canvasSnap The canvas information received from FB.
   * @returns {void}
   */
  processCanvasInfo(canvasId, canvasSnap) {
    const canvasObj = {};
    canvasObj[RC.CANVAS_NAME] = canvasSnap.child('name').val();
    if (canvasSnap.child('orientation').val()) {
      canvasObj[RC.CANVAS_ORIENTATION] = canvasSnap.child('orientation').val();
    }
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
    firebase.database().ref(`${RC.CANVASES}/${canvasId}/${RC.CANVAS_ORIENTATION}`)
      .on('value', (snap) => {
        this.props.dispatch(
          CanvasActions.setCanvasOrientation(canvasId, snap.val())
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
   * Renders the canvas in HTML.
   * If user accesses invalid canvas or one they don't have permissions to,
   * redirects to error page.
   * If user is not logged in, redirects to home page.
   * @returns {HTML}    The rendered component.
   */
  render() {
    if (this.props.authState) {
      if (this.state.validId && this.props.params.canvasId in this.props.canvases) {

        const currentCanvasInfo = this.props.canvases[this.props.params.canvasId];
        const hasCode = (this.props.craftmlCode.length > 0);
        const hasImage = (currentCanvasInfo[RC.CANVAS_IMAGE] !== null
          && typeof(currentCanvasInfo[RC.CANVAS_IMAGE]) !== 'undefined');

        return (
          <div>
            <OptionsBar
              canvas={currentCanvasInfo}
              currentCanvas={this.props.params.canvasId}
              elements={this.props.elements}
            />
            <CanvasView
              currentCanvas={this.props.params.canvasId}
              elements={this.props.elements}
              targetedId={this.props.targetedId}
            />
            <Sidebar
              autoRender={this.props.autoRender}
              canvas={currentCanvasInfo}
              currentCanvas={this.props.params.canvasId}
              elements={this.props.elements}
              hasCanvasImage={hasImage}
              targetedId={this.props.targetedId}
              hasCode={hasCode}
            />
            <Preview3D
              autoRender={this.props.autoRender}
              canvas={currentCanvasInfo}
              craftmlCode={this.props.craftmlCode}
              elements={this.props.elements}
            />
          </div>
        );
      }
      else if (this.state.validId === false) {
        return (
          <CanvasError />
        );
      }
      else {
          return (
            <LoadingIndicator />
          );
        }
      }
      else {
        document.location = '/#/';
        return (
          <div></div>
        );
      }
    }
  }

const mapStateToProps = state => ({
  elements: (state.updateElementReducer[RC.ELEMENTS]),
  canvases: (state.canvasReducer[RC.CANVASES]),
  targetedId: (state
    .activeElementReducer[RC.ACTIVE_ELEMENT]),
  craftmlCode: state.craftmlCodeReducer[RC.CODE],
  autoRender: state.craftmlCodeReducer[RC.AUTO_GENERATE_CODE],
});

Canvas.propTypes = {
  authState: PropTypes.bool,
  dispatch: PropTypes.func,
  elements: PropTypes.object,
  canvases: PropTypes.object,
  targetedId: PropTypes.string,
  craftmlCode: PropTypes.string,
  autoRender: PropTypes.bool,
  params: PropTypes.object,
}

export default connect(mapStateToProps)(Canvas);
