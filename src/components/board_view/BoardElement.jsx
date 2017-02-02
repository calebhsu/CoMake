/* Component representing a draggable, resizable element on the Board. */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Rnd from 'react-rnd';
// import Draggable from 'react-draggable';
// import { ResizableBox } from 'react-resizable';

import { updatePositionAndPersist } from '../redux/actions';

// BoardElement represents a draggable element


/* Collect function used for the DnD API.
 * @param {Connector} DnD Connector.
 * @param {Monitor} DnD Monitor.
 * @returns {Object} Object informing DnD on dragging.
 */

/*
 * Component for an element on the board.
 */
export default class BoardElement extends React.Component {

  constructor(props) {
    super(props);
    this.endDrag = this.endDrag.bind(this);
    this.endResize = this.endResize.bind(this);
  }

  endDrag(e, data) {
    const updatedLoc = {
      x: this.props.initLoc.x + data.deltaX,
      y: this.props.initLoc.y + data.deltaY,
    };
    console.log("Here is the new location:");
    console.log(updatedLoc);
    /* TODO: Not sure what to do here, ask Seth */
    // updatePositionAndPersist(this.props.elementId, updatedLoc, true);
  }

  endResize(direction, styleSize, clientSize, delta) {
    console.log("Here is the new size:");
    console.log(clientSize);
  }

  render() {
    const dragHandlers = { onDragStop: this.endDrag, onResizeStop: this.endResize };
    return (
      <Rnd bounds={'parent'} {...dragHandlers}>
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
