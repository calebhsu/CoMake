/* Component where elements can be positioned on. */

import React from 'react';
import { DropTarget } from 'react-dnd';

import BoardElement from './BoardElement';
import { ItemTypes } from './../../Constants';

// Spec for DnD API. Specifies what should happen on drop of BoardElement.
const boardSpec = {
  drop(props) {
    return;
  },
};

/* Collect function for DnD API, specifies props to be injected
 * @param {Connector} DnD Connector.
 * @param {Monitor} DnD Monitor.
 * @returns {Object} Object to be injected into component as props.
 */
function collect(connector, monitor) {
  return {
    connectDropTarget: connector.dropTarget(),
    dropOffset: monitor.getClientOffset(),
  };
}

/*
 * Component for the board for users to arrange elements on.
 */
class Board extends React.Component {
  render() {
    const { connectDropTarget, dropOffset } = this.props;
    console.log(dropOffset);
    return connectDropTarget(
      <div
        style={{ outline: 'black solid 1px',
          height: '100px',
          width: '80%',
          marginLeft: '10%' }}
      >
        <div
          style={{
            position: 'absolute',
            left: dropOffset ? dropOffset.x : 100,
            top: dropOffset ? dropOffset.y : 100,
          }}
        >
          <BoardElement />
        </div>
      </div>
    );
  }
}

export default DropTarget(ItemTypes.BOARD_ELEMENT, boardSpec, collect)(Board);
