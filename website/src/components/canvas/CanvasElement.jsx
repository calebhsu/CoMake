/**
 * @file Component representing a draggable, resizable element on the Canvas.
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Rnd from 'react-rnd';

import {
  UPDATE_POSITION, UPDATE_SIZE
} from '../../redux/actions/ActionConstants';
import { updateAndPersist } from '../../redux/actions/ElementActions';
import { targetElement } from '../../redux/actions/ActiveElementActions';

const min_dim = 20;

const styles = {
  selected: {
    border: '4px solid rgba(39, 179, 198, 0.78)',
  }
}

/**
 * Component for an element on the canvas.
 */
class CanvasElement extends React.Component {

  /**
   * Constructor for CanvasElement
   * @param {Object} props The props for the CanvasElement.
   */
  constructor(props) {
    super(props);
    this.elementRef;
    this.endDrag = this.endDrag.bind(this);
    this.endResize = this.endResize.bind(this);
    this.targetClicked = this.targetClicked.bind(this);
  }

  /**
   * Updates the component's position and size when new props are fed in.
   * @param {Object} nextProps The new props being passed in.
   * @returns {void}
   */
  componentWillUpdate(nextProps) {
    if (this.elementRef) {
      this.elementRef.updatePosition(nextProps.initLoc);
      this.elementRef.updateSize(nextProps.initSize);
    }
  }

  /**
   * Handler for the end drag event.
   * @param {Event} e The event of the drag ending.
   * @param {Object} data Object of the data corresponding to the end drag.
   * @returns {void}
   */
  endDrag(e, data) {
    const updatedLoc = {
      x: data.position.left,
      y: data.position.top,
    };
    this.props.dispatch(updateAndPersist(UPDATE_POSITION, this.props.elementId,
      updatedLoc, this.props.currentCanvas));
  }

  /**
   * Handler for the end resize event.
   * @param {unknown} direction unknown
   * @param {unknown} styleSize unknown
   * @param {unknown} clientSize unknown
   * @returns {void}
   */
  endResize(direction, styleSize, clientSize) {
    if(clientSize.width < min_dim) {
      clientSize.width = min_dim;
    }
    if(clientSize.height < min_dim) {
      clientSize.height = min_dim;
    }

    this.props.dispatch(updateAndPersist(UPDATE_SIZE, this.props.elementId,
      clientSize, this.props.currentCanvas));
  }

  /**
   * Handler for onClick that dispatches a targetElement event.
   * @returns {void}
   */
  targetClicked() {
    this.props.dispatch(targetElement(this.props.elementId));
  }

  /**
   * Renders the element for display.
   * @returns {HTML} The rendered HTML.
   */
  render() {
    const elementProps = {
      initial: {
        x: this.props.initLoc.x,
        y: this.props.initLoc.y,
        width: this.props.initSize.width,
        height: this.props.initSize.height,
      },
      onClick: this.targetClicked,
      onDragStop: this.endDrag,
      onResizeStop: this.endResize,
    };
    const imagePath = 'url(' + this.props.image + ')';
    const rotationTransform = 'rotate(' + String(this.props.rotation) + 'deg)';

    return (
      <Rnd
        bounds={'parent'}
        ref={ elem => { this.elementRef = elem; } }
        style={this.props.isSelected ? styles.selected : {}}
        {...elementProps}
      >
        <div
          id={this.props.elementId}
          style={{
            backgroundImage: imagePath,
            backgroundRepeat: 'no-repeat',
            backgroundSize: '100% 100%',
            height: '100%',
            transform: rotationTransform,
          }}
        />
      </Rnd>
    );
  }
}

CanvasElement.propTypes = {
  currentCanvas: PropTypes.string,
  dispatch: PropTypes.func,
  elementId: PropTypes.string,
  image: PropTypes.string,
  initLoc: PropTypes.object,
  initSize: PropTypes.object,
  rotation: PropTypes.number,
  isSelected: PropTypes.bool,
}

export default connect()(CanvasElement);
