/**
 * @file Component on which elements can be positioned.
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as firebase from 'firebase';

import CanvasElement from './CanvasElement';
import * as ElementActions from '../../redux/actions/ElementActions';
import * as ActiveElementActions from '../../redux/actions/ActiveElementActions';

const backgroundImageString = ('linear-gradient(to right, #dddddd 1px, '
                               + 'transparent 1px), linear-gradient(to bottom, #dddddd 1px,'
                               + 'transparent 1px)');
const styles = {
  canvas: {
    backgroundSize: '25px 25px',
    backgroundImage: backgroundImageString,
    height: '84vh',
    margin: '1vw 1vw 1vw 0.5vw',
    position: 'absolute',
    top: 100,
    width: '98vw',
  }
};

/**
 * Component for the CanvasView for users to arrange elements on.
 */
class CanvasView extends React.Component {

  /**
   *  Constructor for CanvasView
   * @param {Object} props The props for the CanvasElement.
   */
  constructor(props) {
    super(props);
  }

  /**
   * Function to automatically be performed once the component mounts.
   * @returns {void}
   */
  componentDidMount() {
    const elementPath = 'canvases/' + this.props.currentCanvas + '/elements';
    firebase.database().ref(elementPath).once('value').then((elemListSnap) => {
      let firebaseElemList = elemListSnap.val();
      if(!firebaseElemList) {
        firebaseElemList = {};
      }

      this.props.dispatch(ElementActions.initElements(firebaseElemList));
    });
    firebase.database().ref(elementPath).on('child_added', (elemSnap) => {
      this.props.dispatch(ElementActions.addElement(elemSnap.key,
        elemSnap.val()));
    });
    firebase.database().ref(elementPath).on('child_changed', (elemSnap) => {
      this.props.dispatch(ElementActions.addElement(elemSnap.key,
        elemSnap.val()));
    });
    firebase.database().ref(elementPath).on('child_removed', (elemSnap) => {
      this.props.dispatch(ElementActions.removeElement(elemSnap.key));
    });
  }

  /**
   * After we unmount the canvas stop listening to the elements.
   * @returns {void}
   */
  componentWillUnmount() {
    const elementPath = 'canvases/' + this.props.currentCanvas + '/elements';
    firebase.database().ref(elementPath).off();
    this.props.dispatch(ActiveElementActions.targetElement(null));
  }

  /**
   * Renders the element for display.
   * @returns {HTML} The rendered HTML.
   */
  render() {
    const elemDivs = [];
    if (this.props.elements) {
      const elemKeys = Object.keys(this.props.elements);
      if (elemKeys.length > 0) {
        elemKeys.forEach((id) => {
          const elemDetails = this.props.elements[id];

          if (elemDetails.image
              && elemDetails.position
              && elemDetails.size
              && typeof(elemDetails.rotation) === 'number') {
            elemDivs.push(
              <CanvasElement key={id} elementId={id}
                currentCanvas={this.props.currentCanvas}
                image={elemDetails.image}
                initLoc={elemDetails.position}
                initSize={elemDetails.size}
                rotation={Number(elemDetails.rotation)}
                isSelected={id === this.props.targetedId}
              />
            );
          }
        });
      }
    }
    return (
      <div style={styles.canvas}>
        { elemDivs }
      </div>
    );
  }
}

CanvasView.propTypes = {
  currentCanvas: PropTypes.string,
  dispatch: PropTypes.func,
  elements: PropTypes.object,
  targetedId: PropTypes.string,
}

export default connect()(CanvasView);
