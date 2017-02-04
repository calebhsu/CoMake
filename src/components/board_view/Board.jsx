/* Component where elements can be positioned on. */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as firebase from 'firebase';

import BoardElement from './BoardElement';
import { initPositions, updatePosition } from '../redux/actions';


/*
 * Component for the board for users to arrange elements on.
 */
class Board extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    firebase.database().ref('/test').once('value').then((elemListSnap) => {
      this.props.dispatch(initPositions(elemListSnap.val()));
    });

    firebase.database().ref('/test').on('child_changed', (elemSnap) => {
      this.props.dispatch(updatePosition(elemSnap.val()));
    });
  }

  render() {
    const elemDivs = [];
    Object.keys(this.props.elements).forEach((id) => {
      const elemDetails = this.props.elements[id];
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

Board.propTypes = {
  dispatch: PropTypes.func,
  elements: PropTypes.object,
}

const mapStateToProps = state => ({
  elements: state.positions.elements,
});

export default connect(mapStateToProps)(Board);
