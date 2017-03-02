import React from 'react';
import { Box } from 'reflexbox';

import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField'

import ExportModal from './ExportModal';
import ShareCanvasModal from './ShareCanvasModal';

import {
  white,
  purple500,
  blue500,
  green400,
  orange500,
} from 'material-ui/styles/colors';

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

/**
 * Gives HTML for the canvas options bar.
 * @returns {HTML}   The HTML of the canvas options toolbar.
 */
function OptionsBar() {
  return (
    <Box style={styles.box} col={9} sm={12} md={9}>
      <Paper style={styles.paper} zDepth={1}>
      <TextField style={styles.modelName} id="text-field-default" defaultValue="Model Racecar"/>
        <span style={styles.optionBtnGroup}>
          <FlatButton label="File Options" style={styles.optionBtn} />
          <FlatButton label="Import" style={styles.optionBtn} />
          <ExportModal />
          <ShareCanvasModal />
          <IconButton tooltip="Shaggy" touch={true} tooltipPosition="bottom-center">
            <Avatar color={white} backgroundColor={green400} style={styles.avatar} size={30}>
              S
            </Avatar>
          </IconButton>
          <IconButton tooltip="Velma" touch={true} tooltipPosition="bottom-center">
            <Avatar color={white} backgroundColor={orange500} style={styles.avatar} size={30}>
              V
            </Avatar>
          </IconButton>
          <IconButton tooltip="Fred" touch={true} tooltipPosition="bottom-center">
            <Avatar color={white} backgroundColor={blue500} style={styles.avatar} size={30}>
              F
            </Avatar>
          </IconButton>
          <IconButton tooltip="Daphne" touch={true} tooltipPosition="bottom-center">
            <Avatar color={white} backgroundColor={purple500} style={styles.avatar} size={30}>
              D
            </Avatar>
          </IconButton>
        </span>
      </Paper>
    </Box>
  )
}

export default OptionsBar;
