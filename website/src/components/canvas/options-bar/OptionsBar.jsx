import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { Box } from 'reflexbox';
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField'
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';

import ArchiveCanvas from './ArchiveCanvas';
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
  grey900,
} from 'material-ui/styles/colors';

const COLORS = [purple500, blue500, green400, orange500];

const styles = {
  modelName: {
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
          <ToolbarGroup>
            <TextField
              id="text-field-default"
              value={canvasName}
              onChange={this.nameFieldChangeHandler}
              style={styles.modelName}
            />
            <ImportModelModal currentCanvas={this.props.currentCanvas} />
            <ExportModal elements={this.props.elements} />
            <ShareCanvasModal />
          </ToolbarGroup>
          <ToolbarGroup>
            { userDivs }
          <ArchiveCanvas
            canvasId={this.props.currentCanvas} />
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
  dispatch: PropTypes.func,
  elements: PropTypes.object,
  canvas: PropTypes.object,
  currentCanvas: PropTypes.string,
}

export default connect()(OptionsBar);
