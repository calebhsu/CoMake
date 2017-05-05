/**
 * @file Component on which elements can be positioned.
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import CanvasElement from './CanvasElement';

const backgroundImageString = ('linear-gradient(to right, #dddddd 1px, '
                               + 'transparent 1px), linear-gradient(to bottom, #dddddd 1px,'
                               + 'transparent 1px)');
const styles = {
  canvas: {
    backgroundSize: '25px 25px',
    backgroundImage: backgroundImageString,
    borderBottom: '1px solid #dddddd',
    borderRight: '1px solid #dddddd',
    height: 1000,
    margin: '13px 0 0 60px',
    overFlowY: 'scroll',
    position: 'absolute',
    top: 100,
    width: 1800,
  }
};

/**
 * Component for the CanvasView for users to arrange elements on.
 */
class CanvasView extends React.Component {

  /**
   *  Constructor for CanvasView
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

          if (elemDetails.image
              && elemDetails.position
              && elemDetails.size
              && typeof(elemDetails.rotation) === 'number') {
            elemDivs.push(
              <CanvasElement key={id} elementId={id}
                currentCanvas={this.props.currentCanvas}
                image={elemDetails.image}
                initLoc={elemDetails.position}
                initSize={elemDetails.size}
                rotation={Number(elemDetails.rotation)}
                isSelected={id === this.props.targetedId}
              />
            );
          }
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
  currentCanvas: PropTypes.string,
  dispatch: PropTypes.func,
  elements: PropTypes.object,
  targetedId: PropTypes.string,
}

export default connect()(CanvasView);
