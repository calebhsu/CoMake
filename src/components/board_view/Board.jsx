/* Component where elements can be positioned on. */

import React, { PropTypes } from 'react';
import { DragLayer } from 'react-dnd';
import * as firebase from 'firebase';

import BoardElement from './BoardElement';

/* Collect function for DnD API, specifies props to be injected
 * @param {Monitor} DnD Monitor.
 * @returns {Object} Object to be injected into component as props.
 */
function collect() {
  return {};
}

/*
 * Component for the board for users to arrange elements on.
 */
class Board extends React.Component {

  constructor(props) {
    super(props);

    this.elements = {};
  }

  componentDidMount() {
    firebase.database().ref('/test').once('value').then((elemListSnap) => {
      this.elements = elemListSnap.val();
      this.forceUpdate();
    });

    firebase.database().ref('/test').on('child_changed', (elemSnap) => {
      this.elements[elemSnap.key] = {
        position: elemSnap.child('/position').val(),
        size: null,
        picId: null,
      };

      this.forceUpdate();
    });
  }

  render() {
    const elements = this.elements;
    const elemDivs = [];
    Object.keys(elements).forEach((id) => {
      const elemDetails = elements[id];
      elemDivs.push(
        <div
          key={`dev-${id}`}
          style={{
            position: 'absolute',
            left: elemDetails.position.x,
            top: elemDetails.position.y,
          }}
        >
          <BoardElement elementId={id} initLoc={elemDetails.position} />
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

export default DragLayer(collect)(Board);

