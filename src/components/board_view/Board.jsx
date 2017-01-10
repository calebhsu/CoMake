import React from 'react';
import BoardElement from './BoardElement';


/*
 * Component for the board for users to arrange elements on.
 */
export default class Board extends React.Component {
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
