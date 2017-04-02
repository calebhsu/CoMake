import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as firebase from 'firebase';

import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField'

import ExportModal from './ExportModal';
import ImportModelModal from './ImportModelModal';
import ShareCanvasModal from './ShareCanvasModal';
import * as RC from '../../../redux/reducers/ReducerConstants';
import * as CA from '../../../redux/actions/CanvasActions';


import {
  white,
  purple500,
  blue500,
  green400,
  orange500,
} from 'material-ui/styles/colors';

const COLORS = [purple500, blue500, green400, orange500];

const styles = {
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
    paddingLeft: 250,
    position: 'fixed',
    textAlign: 'center',
    top: 55,
    width: '100%',
    zIndex: 10,
  },
};

class OptionsBar extends React.Component {
  /**
   * Constructor for the class.
   * @param {Object} props The props passed to the component.
   * @returns {void}
   */
  constructor(props) {
    super(props);
    this.state = {
      snackbarOpen: false,
    };
    this.nameFieldChangeHandler = this.nameFieldChangeHandler.bind(this);
    this.handleSnackbarRequestClose = this.handleSnackbarRequestClose.bind(this);
  }

  /**
   * Function to automatically be performed once the component mounts.
   * @returns {void}
   */
  componentDidMount() {
    const canvasPath = 'canvases/' + this.props.currentCanvas + '/';
    firebase.database().ref(canvasPath + RC.CANVAS_NAME).on('value', (snap) => {
      this.props.dispatch(CA.setCanvasName(this.props.currentCanvas, snap.val()));
    });
    firebase.database().ref(canvasPath + RC.CANVAS_USERS).on('child_added', (snap) => {
      this.props.dispatch(CA.addCanvasUser(this.props.currentCanvas, snap.key, snap.val()));
    })
  }

  /**
   * After we unmount the canvas stop listening to the elements.
   * @returns {void}
   */
  componentWillUnmount() {
    const canvasPath = 'canvases/' + this.props.currentCanvas + '/';
    firebase.database().ref(canvasPath).off();
  }
  /**
   * Handler for onRequestClose that sets snackbar's open state to false.
   * @returns {void}
   */
  handleSnackbarRequestClose() {
      this.setState({snackbarOpen: false});
  }
  /**
   * Handler for when the name field is changed.
   * @param {Object} e  The event of changing the name.
   * @param {String} newValue The new name entered.
   * @returns {void}
   */
  nameFieldChangeHandler(e, newValue) {
    this.props.dispatch(CA.setCanvasNameAndPersist(this.props.currentCanvas,
      newValue))
      this.setState({snackbarOpen: true});
  }

  /**
   * Gives HTML for the canvas options bar.
   * @returns {HTML}   The HTML of the canvas options toolbar.
   */
  render() {
    let canvasName = 'Canvas Name';
    const userDivs = [];
    if (this.props.canvas) {
      canvasName = this.props.canvas[RC.CANVAS_NAME];
      if (this.props.canvas[RC.CANVAS_USERS]) {
        let currColorIndex = 0;
        Object.keys(this.props.canvas[RC.CANVAS_USERS]).forEach((uid) => {
          const userEmail = this.props.canvas[RC.CANVAS_USERS][uid];
          userDivs.push(
            <IconButton
              tooltip={userEmail}
              touch={true}
              tooltipPosition="bottom-center"
              key={userEmail}
            >
              <Avatar
                color={white}
                backgroundColor={COLORS[currColorIndex]}
                style={styles.avatar}
                size={30}
              >
                {userEmail[0]}
              </Avatar>
            </IconButton>
          );
          currColorIndex = (currColorIndex + 1) % COLORS.length;
        });
      }
    }
    return (
      <div id="options">
        <Paper style={styles.paper} zDepth={1}>
          <TextField
            style={styles.modelName}
            id="text-field-default"
            defaultValue={canvasName}
            onChange={this.nameFieldChangeHandler}
          />
          <span style={styles.optionBtnGroup}>
            <FlatButton label="File Options" style={styles.optionBtn} />
            <ImportModelModal currentCanvas={this.props.currentCanvas} />
            <ExportModal elements={this.props.elements} />
            <ShareCanvasModal />
            { userDivs }
          </span>
        </Paper>
        <Snackbar
          autoHideDuration={2000}
          message="Canvas name saved."
          onRequestClose={this.handleSnackbarRequestClose}
          open={this.state.snackbarOpen}
        />
      </div>
    );
  }
}

OptionsBar.propTypes = {
  dispatch: PropTypes.func,
  elements: PropTypes.object,
  canvas: PropTypes.object,
  currentCanvas: PropTypes.string,
}

export default connect()(OptionsBar);
