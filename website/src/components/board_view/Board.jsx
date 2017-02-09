/* Component where elements can be positioned on. */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as firebase from 'firebase';

import BoardElement from './BoardElement';
import { initPositions, updatePosition } from '../../redux/actions/positionsActions';


/*
 * Component for the board for users to arrange elements on.
 */
class Board extends React.Component {

  /* Constructor for BoardElement
   * @param {Object} The props for the BoardElement.
   */
  constructor(props) {
    super(props);
  }

  /* Function to automatically be performed once the component mounts. */
  componentDidMount() {
    firebase.database().ref('/test').once('value').then((elemListSnap) => {
      this.props.dispatch(initPositions(elemListSnap.val()));
    });

    firebase.database().ref('/test').on('child_changed', (elemSnap) => {
      this.props.dispatch(
        updatePosition(elemSnap.key, elemSnap.child('position').val())
      );
    });
  }

  /* Renders the element for display.
   * @return {HTML} The rendered HTML.
   */
  render() {
    const elemDivs = [];
    Object.keys(this.props.elements).forEach((id) => {
      const elemDetails = this.props.elements[id];
      elemDivs.push(
        <BoardElement key={id} elementId={id} initLoc={elemDetails.position} />
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

Board.propTypes = {
  dispatch: PropTypes.func,
  elements: PropTypes.object,
}

const mapStateToProps = state => ({
  elements: state.positions.elements,
});

export default connect(mapStateToProps)(Board);
