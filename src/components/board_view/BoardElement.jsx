import React from 'react';

export default class BoardElement extends React.Component {
  render() {
    return (
      <div
        style={{ outline: 'black solid 1px',
          height: '25px',
          width: '25px',
          backgroundColor: 'blue' }}
      />
    );
  }
}
