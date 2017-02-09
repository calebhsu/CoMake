/* Component representing a draggable, resizable element on the Board. */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Rnd from 'react-rnd';

import { updatePositionAndPersist } from '../../redux/actions/positionsActions';

/*
 * Component for an element on the board.
 */
class BoardElement extends React.Component {

  /* Constructor for BoardElement
   * @param {Object} The props for the BoardElement.
   */
  constructor(props) {
    super(props);
    this.elemRef;
    this.endDrag = this.endDrag.bind(this);
    this.endResize = this.endResize.bind(this);
  }

  /* Updates the component's position when new props are fed in.
   * @param {Object} The new props being passed in.
   */
  componentWillUpdate(nextProps) {
    if (this.elemRef) {
      this.elemRef.updatePosition(nextProps.initLoc);
    }
  }

  /* Handler for the end drag event.
   * @param {Event} The event of the drag ending.
   * @param {Object} Object of the data corresponding to the end drag.
   */
  endDrag(e, data) {
    const updatedLoc = {
      x: data.position.left,
      y: data.position.top,
    };
    this.props.dispatch(updatePositionAndPersist(this.props.elementId,
      updatedLoc, true));
  }

  /* Handler for the end resize event.
   * @param {Event} The event of the drag ending.
   * @param {Object} Object of the data corresponding to the end drag.
   */
  endResize(direction, styleSize, clientSize) {
    /* TODO: Dispatch event for resizing the object. */
    return
  }

  /* Renders the element for display.
   * @return {HTML} The rendered HTML.
   */
  render() {
    const elemProps = { onDragStop: this.endDrag,
      onResizeStop: this.endResize,
      initial: { x: this.props.initLoc.x,
        y: this.props.initLoc.y,
        width: 100,
        height: 100,
      },
    };
    return (
      <Rnd bounds={'parent'} ref={ elem => { this.elemRef = elem; } }
        {...elemProps}
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

BoardElement.propTypes = {
  dispatch: PropTypes.func,
  initLoc: PropTypes.object,
  initSize: PropTypes.object,
  elementId: PropTypes.string,
}

export default connect()(BoardElement);
