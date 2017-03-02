import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

import RotationSlider from './RotationSlider';
import * as ElementActions from '../../redux/actions/ElementActions';
import * as CC from './CanvasConstants';
import * as RC from '../../redux/reducers/ReducerConstants';
import * as FBUtil from '../../firebase-utils/index';

const styles = {
  listItems: {
    marginTop: 20,
  },
  sidebar: {
    backgroundColor: 'rgba(1, 1, 1, .06)',
    marginTop: 114,
    width: '12vw',
  },
};



/**
 * @classdesc Sidebar for the canvas page.
  */
class Sidebar extends React.Component {
  /**
   * constructor for the Sidebar.
   * @param {Object} props The props to be passed in.
   */
  constructor(props) {
    super(props);
    this.removeElement = this.removeElement.bind(this);
    this.mapOptionToDiv = this.mapOptionToDiv.bind(this);
    this.listItems = CC.SIDEBAR_BUTTONS.map(this.mapOptionToDiv);
  }

  /**
   * Function that will delete the current targeted element.
   * @returns {void}
   */
  removeElement() {
    this.props.dispatch(ElementActions.removeElementAndPersist(
      this.props.targetedId));
  }

  addElement() {
    /* TODO: Make this take a specific module*/
    FBUtil.addElement('abcd', CC.INIT_POSITION, CC.INIT_SIZE, CC.INIT_ROTATION);
  }

  /**
   * Maps list item to a div to put in the drawer.
   * @param {String} item The item name to encapsulate into a ManueItem.
   * @returns {HTML} A MenuItem tag that holds the name of the item.
   */
  mapOptionToDiv(item) {
    let buttonAction = () => {};
    switch(item) {
      case CC.DELETE_ELEMENT_BUTTON:
        buttonAction = this.removeElement;
        break;
      case CC.ADD_ELEMENT_BUTTON:
        buttonAction = this.addElement;
        break;
    }
    return (<MenuItem key={item.toString()} onClick={buttonAction}>
      {item}
    </MenuItem>);
  }

  /**
   * Renders the HTML for the sidebar.
   * @returns {HTML} The html for the Sidebar.
   */
  render() {
    return (
      <div>
        <Drawer containerStyle={styles.sidebar}
                open= {true}
                docked={true}
                openSecondary={false}
        >
        <div style={styles.listItems}>
          {this.listItems}
        </div>
        <RotationSlider />
        </Drawer>
      </div>
    );
  }
}

Sidebar.propTypes = {
  dispatch: PropTypes.func,
  targetedId: PropTypes.string,
}

const mapStateToProps = state => ({
  targetedId: (state
    .currentCanvasReducer[RC.CURRENT_CANVAS][RC.CANVAS_ACTIVE_ELEMENT]),
});

export default connect(mapStateToProps)(Sidebar);
