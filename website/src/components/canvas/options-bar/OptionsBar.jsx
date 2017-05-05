import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField'
import { Toolbar, ToolbarGroup, ToolbarSeparator } from 'material-ui/Toolbar';

import ArchiveCanvasBtn from './ArchiveCanvasBtn';
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
  grey400
} from 'material-ui/styles/colors';

const COLORS = [purple500, blue500, green400, orange500];

const styles = {
  greyDivider: {
    backgroundColor: grey400,
  },
  leftMargin: {
    marginLeft: 210,
  },
  modelName: {
    fontFamily: 'Open Sans, Roboto, Helvetica, sans-serif',
    marginLeft: 15,
  },
  optionBtnGroup: {
    float: 'left',
    marginLeft: 20,
    marginRight: 10,
  },
  toolbar: {
    height: 50,
    paddingLeft: 55,
    position: 'fixed',
    textAlign: 'center',
    top: 55,
    width: '100%',
    zIndex: 200,
  },
};

class OptionsBar extends Component {
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
        <Toolbar style={styles.toolbar}>
          <ToolbarGroup style={styles.leftMargin}>
            <ImportModelModal currentCanvas={this.props.currentCanvas} />
            <ExportModal
              canvas={this.props.canvas}
              elements={this.props.elements}
            />
            <ShareCanvasModal
              currentCanvas={this.props.currentCanvas}
            />
            <ToolbarSeparator style={styles.greyDivider} />
            { userDivs }
          </ToolbarGroup>
          <ToolbarGroup>
            <TextField
              id="text-field-default"
              value={canvasName}
              onChange={this.nameFieldChangeHandler}
              style={styles.modelName}
            />
            <ToolbarSeparator style={styles.greyDivider} />
            <ArchiveCanvasBtn canvasId={this.props.currentCanvas} />
          </ToolbarGroup>
        </Toolbar>
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
  canvas: PropTypes.object,
  currentCanvas: PropTypes.string,
  dispatch: PropTypes.func,
  elements: PropTypes.object,
}

export default connect()(OptionsBar);
