/**
 * @file Component representing a draggable, resizable element on the Canvas.
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Rnd from 'react-rnd';

import { updateAndPersist, updatePosition, updateSize } from '../../redux/actions/ElementActions';

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
      updatedLoc, true));
  }

  /**
   * Handler for the end resize event.
   * @param {unknown} direction unknown
   * @param {unknown} styleSize unknown
   * @param {unknown} clientSize unknown
   * @returns {void}
   */
  endResize(direction, styleSize, clientSize) {
    /* TODO: Dispatch event for resizing the object. */
    this.props.dispatch(updateAndPersist(updateSize, this.props.elementId,
      clientSize, true));
  }

  /**
   * Renders the element for display.
   * @returns {HTML} The rendered HTML.
   */
  render() {
    const elementProps = { onDragStop: this.endDrag,
      onResizeStop: this.endResize,
      initial: { x: this.props.initLoc.x,
        y: this.props.initLoc.y,
        width: this.props.initSize.width,
        height: this.props.initSize.height,
      },
    };
    return (
      <Rnd bounds={'parent'} ref={ elem => { this.elementRef = elem; } }
        {...elementProps}
      >
        <div
          style={{
            height: '100%',
            width: '100%',
            backgroundImage: 'url(http://marcoortiztorres.me/images/craftml.png)',
            backgroundSize: 'cover' }}
        />
      </Rnd>
    );
  }
}

CanvasElement.propTypes = {
  dispatch: PropTypes.func,
  initLoc: PropTypes.object,
  initSize: PropTypes.object,
  elementId: PropTypes.string,
}

export default connect()(CanvasElement);
