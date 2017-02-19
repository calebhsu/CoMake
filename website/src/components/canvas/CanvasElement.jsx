/**
 * @file Component representing a draggable, resizable element on the Canvas.
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Rnd from 'react-rnd';

import {
  updateAndPersist, updatePosition, updateSize, targetElement
} from '../../redux/actions/ElementActions';

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
   * Updates the component's position when new props are fed in.
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
    this.props.dispatch(updateAndPersist(updatePosition, this.props.elementId,
      updatedLoc));
  }

  /**
   * Handler for the end resize event.
   * @param {unknown} direction unknown
   * @param {unknown} styleSize unknown
   * @param {unknown} clientSize unknown
   * @returns {void}
   */
  endResize(direction, styleSize, clientSize) {
    this.props.dispatch(updateAndPersist(updateSize, this.props.elementId,
      clientSize));
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
      onDragStop: this.endDrag,
      onResizeStop: this.endResize,
      onClick: this.targetClicked,
      initial: { x: this.props.initLoc.x,
        y: this.props.initLoc.y,
        width: this.props.initSize.width,
        height: this.props.initSize.height,
      },
    };
    const rotationTransform = 'rotate(' + String(this.props.rotation) + 'deg)';
    return (
      <Rnd
        bounds={'parent'}
        ref={ elem => { this.elemRef = elem; } }
        {...elementProps}
      >
        <div
          style={{
            backgroundImage: 'url(http://marcoortiztorres.me/images/craftml.png)',
            transform: rotationTransform,
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat',
            height: '100%'
          }}
        />
      </Rnd>
    );
  }
}

CanvasElement.propTypes = {
  dispatch: PropTypes.func,
  initLoc: PropTypes.object,
  initSize: PropTypes.object,
  rotation: PropTypes.number,
  elementId: PropTypes.string,
}

export default connect()(CanvasElement);
