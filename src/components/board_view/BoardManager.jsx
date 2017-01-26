/* Component to encapsulate element state and listen to changes in elements */

import React from 'react';
import { DragLayer } from 'react-dnd';
import * as firebase from 'firebase';

import Board from './Board';

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
class BoardManager extends React.Component {

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
    return (<Board elements={this.elements} />);
  }
}

export default DragLayer(collect)(BoardManager);
