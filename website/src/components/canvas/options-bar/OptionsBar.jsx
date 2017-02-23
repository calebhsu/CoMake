import React from 'react';
import { Box } from 'reflexbox';

import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';

import ExportModal from './ExportModal';
import ShareCanvasModal from './ShareCanvasModal';

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
        <h3 style={styles.modelName}>Racecar Model</h3>
        <span style={styles.optionBtnGroup}>
          <FlatButton label="File Options" style={styles.optionBtn} />
          <FlatButton label="Import" style={styles.optionBtn} />
          <ExportModal />
          <ShareCanvasModal />
        </span>
      </Paper>
    </Box>
  )
}

export default OptionsBar;
