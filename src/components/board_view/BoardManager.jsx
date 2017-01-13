/* Component to encapsulate element state and listen to changes in elements */

import React, { PropTypes } from 'react';
import { DragLayer } from 'react-dnd';

import Board from './Board';

/* Collect function for DnD API, specifies props to be injected
 * @param {Monitor} DnD Monitor.
 * @returns {Object} Object to be injected into component as props.
 */
function collect(monitor) {
  return {
    currDragged: monitor.getItem(),
    dragOffset: monitor.getClientOffset(),
    isDragging: monitor.isDragging(),
  };
}

/*
 * Component for the board for users to arrange elements on.
 */
class BoardManager extends React.Component {

  constructor(props) {
    super(props);
    this.elements = {
      1: {
        position: {
          x: 100,
          y: 100,
        },
      },
      2: {
        position: {
          x: 200,
          y: 200,
        },
      },
    };
    this.elemToUpdate = {};
  }

  /* Update elemToUpdate with received coordinates for corresponding element
   * if the coordinates fit in the board.
   * @param {Object} Object containing the elementId for the dragged element.
   * @param {Object} Object containing x, y coordinates of element.
   */
  updateIfValid(currDragged, dragOffset) {
    /* TODO: Create some logic to see if dragOffset is valid..*/
    this.elemToUpdate[currDragged.elementId] = {
      position: dragOffset, size: null, picId: null,
    };
  }

  render() {
    const { currDragged, dragOffset, isDragging } = this.props;
    if (isDragging) {
      // If we are still dragging see if we should update the coords.
      this.updateIfValid(currDragged, dragOffset);
    } else {
      // Else make the updates concrete.
      Object.keys(this.elemToUpdate).forEach((id) => {
        this.elements[id] = this.elemToUpdate[id];
        /* TODO: Make firebase call to reflect update. */
      });
      this.elemToUpdate = [];
    }
    return (<Board elements={this.elements} />);
  }
}

BoardManager.propTypes = {
  // currDragged and dragOffset must be objects by DnD API... I think...
  currDragged: PropTypes.object,
  dragOffset: PropTypes.object,
  isDragging: PropTypes.bool.isRequired,
};

export default DragLayer(collect)(BoardManager);
