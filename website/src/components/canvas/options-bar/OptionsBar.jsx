import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as firebase from 'firebase';

import { Box } from 'reflexbox';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
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
  }
};

class OptionsBar extends React.Component {
  /**
   * Constructor for the class.
   * @param {Object} props The props passed to the component.
   * @returns {void}
   */
  constructor(props) {
    super(props);
    this.nameFieldChangeHandler = this.nameFieldChangeHandler.bind(this);
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
      <Box style={styles.box} col={9} sm={12} md={9}>
        <Paper style={styles.paper} zDepth={1}>
        <TextField
          style={styles.modelName}
          id="text-field-default"
          value={canvasName}
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
      </Box>
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
