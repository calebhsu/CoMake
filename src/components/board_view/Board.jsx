/* Component where elements can be positioned on. */

import React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import BoardElement from './BoardElement';


/*
 * Component for the board for users to arrange elements on.
 */
class Board extends React.Component {
  render() {
    return (
      <div
        style={{ outline: 'black solid 1px',
          height: '100px',
          width: '80%',
          marginLeft: '10%' }}
      >
        <BoardElement />
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(Board);
