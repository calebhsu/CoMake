/* Component where elements can be positioned on. */

import React, { PropTypes } from 'react';
import * as firebase from 'firebase';

import BoardElement from './BoardElement';


/*
 * Component for the board for users to arrange elements on.
 */
export default class Board extends React.Component {

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
        /* TODO: Change so init location is correct */
        // <div
        //   key={`dev-${id}`}
        //   style={{
        //     position: 'absolute',
        //     left: elemDetails.position.x,
        //     top: elemDetails.position.y,
        //     width: '1000px',
        //     height: '100px',
        //     border: 'solid',
        //   }}
        // >
        <BoardElement elementId={id} initLoc={elemDetails.position} />
        // </div>,
      );
    });
    return (
      <div
        style={{ border: 'solid',
          height: '70%',
          width: '80%',
          marginLeft: '10%',
          position: 'absolute' }}
      >
        { elemDivs }
      </div>
    );
  }
}
