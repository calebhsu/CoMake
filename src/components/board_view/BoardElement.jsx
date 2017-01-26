/* Component representing a draggable, resizable element on the Board. */

import React, { PropTypes } from 'react';
import { DragSource } from 'react-dnd';
import * as firebase from 'firebase';

import { ItemTypes } from './../../Constants';

// BoardElement represents a draggable element

// Source for the DnD API.
const boardElementSource = {
  // beginDrag is a function returning id so we know what element we are
  // currently dragging.
  beginDrag(props) {
    return { elementId: props.elementId };
  },
  endDrag(props, monitor) {
    const dragDiff = monitor.getDifferenceFromInitialOffset();

    firebase.database().ref(`/test/${props.elementId}/position`)
      .transaction(oldPosition => ({
        x: oldPosition.x + dragDiff.x,
        y: oldPosition.y + dragDiff.y,
      }));
  },
};

/* Collect function used for the DnD API.
 * @param {Connector} DnD Connector.
 * @param {Monitor} DnD Monitor.
 * @returns {Object} Object informing DnD on dragging.
 */
function boardElementCollect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  };
}

/*
 * Component for an element on the board.
 */
class BoardElement extends React.Component {
  render() {
    const { connectDragSource, isDragging } = this.props;
    return connectDragSource(
      <div
        style={{ outline: 'black solid 1px',
          height: '25px',
          width: '25px',
          backgroundColor: isDragging ? 'blue' : 'green' }}
      />,
    );
  }
}

BoardElement.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
};

export default DragSource(ItemTypes.BOARD_ELEMENT, boardElementSource,
    boardElementCollect)(BoardElement);
