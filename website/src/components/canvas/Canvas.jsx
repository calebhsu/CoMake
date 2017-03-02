import React from 'react';
import { Box } from 'reflexbox';
import Paper from 'material-ui/Paper';
import Sidebar from './Sidebar';
import CanvasView from './CanvasView';
import OptionsBar from './options-bar/OptionsBar';
import Preview3D from './Preview3D';

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
 * Gives HTML for a new canvas on canvas creation.
 * @returns {HTML}   The HTML of a new canvas.
 */
function Canvas() {
  return (
    <div>
      <Sidebar />
      <Box style={styles.box} col={9} sm={12} md={9}>
        <Paper style={styles.paper} zDepth={1}>
        <OptionsBar />
        </Paper>
      </Box>
      <CanvasView />
      <Preview3D />
    </div>
  )
}

export default Canvas;
