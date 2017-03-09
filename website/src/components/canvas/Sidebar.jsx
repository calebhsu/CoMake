import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Drawer from 'material-ui/Drawer';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';

import RotationSlider from './RotationSlider';
import * as ElementActions from '../../redux/actions/ElementActions';
import * as CC from './CanvasConstants';
import * as FBHelper from '../../helpers/FirebaseHelper';

const styles = {
  listItems: {
    marginTop: 20,
  },
  propertiesSpacing: {
    marginLeft: 10,
    marginRight: 20,
  },
  sidebar: {
    marginTop: 110,
    overflowX: 'hidden',
    position: 'absolute',
    height: '89vh',
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
    this.state = {
      opacity: .7
    }
    this.mouseEnter = this.mouseEnter.bind(this);
    this.mouseLeave = this.mouseLeave.bind(this);
    this.removeElement = this.removeElement.bind(this);
    this.addElement = this.addElement.bind(this);
    this.mapOptionToDiv = this.mapOptionToDiv.bind(this);
    this.listItems = CC.SIDEBAR_BUTTONS.map(this.mapOptionToDiv);
  }

  /**
   * Function that will delete the current targeted element.
   * @returns {void}
   */
  removeElement() {
    this.props.dispatch(ElementActions.removeElementAndPersist(
      this.props.targetedId, this.props.currentCanvas));
  }

  /**
   * Handler for adding an element to firebase.
   * @returns {void}
   */
  addElement() {
    /* TODO: Make this take a specific module*/
    console.log(this.props);
    FBHelper.addElement(this.props.currentCanvas, 'abcd', CC.INIT_POSITION, CC.INIT_SIZE,
      CC.INIT_ROTATION);
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

  mouseEnter() {
    this.setState({opacity: 1})
  }

  mouseLeave() {
    this.setState({opacity: .7})
  }

  /**
   * Renders the HTML for the sidebar.
   * @returns {HTML} The html for the Sidebar.
   */
  render() {
    return (
      <div>
      <div
      onMouseEnter={this.mouseEnter}
      onMouseLeave={this.mouseLeave}>

        <Drawer containerStyle={styles.sidebar}
                open= {true}
                docked={true}
                openSecondary={false}
                style={{opacity: this.state.opacity}}
                zDepth={0}>
          <div
          style={styles.propertiesSpacing}>
          <ul>
            {this.listItems}
            <li>
              <h3>Rotate</h3>
            </li>
              <RotationSlider canvasId={this.props.currentCanvas} />
            <li>
              <h3>Resize</h3>
            </li>
            <li>
              <TextField
                hintText="Current: 64px"
                floatingLabelText="Height"
                fullWidth={true}
              /><br />
            </li>
            <li>
              <TextField
                hintText="Current: 64px"
                floatingLabelText="Width"
                fullWidth={true}
              /><br />
            </li>
          </ul>
          </div>
        </Drawer>
        </div>
      </div>
    );
  }
}

Sidebar.propTypes = {
  dispatch: PropTypes.func,
  targetedId: PropTypes.string,
  currentCanvas: PropTypes.string,
}

export default connect()(Sidebar);
