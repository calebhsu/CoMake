/* Component where elements can be positioned on. */

import React, { PropTypes } from 'react';

import BoardElement from './BoardElement';

/*
 * Component for the board for users to arrange elements on.
 */
export default class Board extends React.Component {
  render() {
    const elements = this.props.elements;
    const elemDivs = [];
    Object.keys(elements).forEach((id) => {
      const elemDetails = elements[id];
      elemDivs.push(
        <div
          style={{
            position: 'absolute',
            left: elemDetails.position.x,
            top: elemDetails.position.y,
          }}
        >
          <BoardElement elementId={id} />
        </div>,
      );
    });
    return (
      <div
        style={{ outline: 'black solid 1px',
          height: '100px',
          width: '80%',
          marginLeft: '10%' }}
      >
        { elemDivs }
      </div>
    );
  }
}

Board.propTypes = {
  // Not sure how to not make this an object...
  elements: PropTypes.object.isRequired,
};
