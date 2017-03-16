/**
 * @file Component on which elements can be positioned.
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as firebase from 'firebase';

import CanvasElement from './CanvasElement';

const backgroundImageString = ('linear-gradient(to right, #dddddd 1px, '
  + 'transparent 1px), linear-gradient(to bottom, #dddddd 1px,'
  + 'transparent 1px)');
const styles = {
  canvas: {
    backgroundSize: '25px 25px',
    backgroundImage: backgroundImageString,
    border: '2px dashed #7e7e7e',
    height: '84vh',
    margin: '1vw 0 1vw 0vw',
    position: 'absolute',
    width: '99vw',
  }
};

/**
 * Component for the CanvasView for users to arrange elements on.
 */
class CanvasView extends React.Component {

  /**
   *  Constructor for CanvasElement
   * @param {Object} props The props for the CanvasElement.
   */
  constructor(props) {
    super(props);
  }

  /**
   * Renders the element for display.
   * @returns {HTML} The rendered HTML.
   */
  render() {
    const elemDivs = [];
    if (this.props.elements) {
      const elemKeys = Object.keys(this.props.elements);
      if (elemKeys.length > 0) {
        elemKeys.forEach((id) => {
          const elemDetails = this.props.elements[id];
          elemDivs.push(
            <CanvasElement key={id} elementId={id}
              initLoc={elemDetails.position}
              initSize={elemDetails.size}
              rotation={Number(elemDetails.rotation)}
              canvasId={this.props.currentCanvas}
            />
          );
        });
      }
    }
    return (
      <div style={styles.canvas}>
        { elemDivs }
      </div>
    );
  }
}

CanvasView.propTypes = {
  dispatch: PropTypes.func,
  elements: PropTypes.object,
  currentCanvas: PropTypes.string,
}



export default connect()(CanvasView);
