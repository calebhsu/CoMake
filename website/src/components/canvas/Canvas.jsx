import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { Box } from 'reflexbox';
import Paper from 'material-ui/Paper';
import Sidebar from './Sidebar';
import CanvasView from './CanvasView';
import OptionsBar from './options-bar/OptionsBar';
import Preview3D from './Preview3D';

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
          elements={this.props.elements}
          currentCanvas={this.props.currentCanvas}
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
  elements: (state
    .updateElementReducer[RC.ELEMENTS]),
  currentCanvas: (state.canvasReducer[RC.CURRENT_CANVAS]),
  canvases: (state.canvasReducer[RC.CANVASES]),
  targetedId: (state
    .activeElementReducer[RC.ACTIVE_ELEMENT]),
});

Canvas.propTypes = {
  dispatch: PropTypes.func,
  elements: PropTypes.object,
  currentCanvas: PropTypes.string,
  canvases: PropTypes.object,
  targetedId: PropTypes.string,
}

export default connect(mapStateToProps)(Canvas);
