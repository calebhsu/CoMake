import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import AppBar from 'material-ui/AppBar';
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import KeyboardArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import TextField from 'material-ui/TextField';
import { black, white, grey900 } from 'material-ui/styles/colors';

import RotationSlider from './RotationSlider';
import * as ElementActions from '../../../redux/actions/ElementActions';
import * as CC from '../CanvasConstants';
import * as FBHelper from '../../../helpers/FirebaseHelper';

const styles = {
  appbar: {
    backgroundColor: '#e74c49',
    height: 49,
  },
  toggleEditMenu: {
    marginTop: -1,
    paddingLeft: 5,
  },
  editBtn: {
    color: '#e74c49',
    height: 25,
    marginLeft: -13,
    padding: 12,
    position: 'absolute',
    top: 55,
    width: 25,
    zIndex: 15,
  },
  field: {
    width: '90%',
  },
  listItems: {
    marginTop: 20
  },
  menuItem: {
    color: grey900,
  },
  propertiesSpacing: {
    marginLeft: 20,
    marginRight: 20,
  },
  sidebar: {
    backgroundColor: '#EFEFEF',
    color: black,
    height: '92vh',
    marginTop: 56,
    overflow: 'hidden',
    position: 'fixed'
  },
  toggleButton: {
    marginRight: -5,
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
      isOpen: true,
      translateX: '0px',
    };

    this.duplicateElement = this.duplicateElement.bind(this);
    this.mapOptionToDiv = this.mapOptionToDiv.bind(this);
    this.handleSidebarToggle = this.handleSidebarToggle.bind(this);
    this.removeElement = this.removeElement.bind(this);
    this.listItems = CC.SIDEBAR_BUTTONS.map(this.mapOptionToDiv);
  }

  /**
   * Function that will delete the current targeted element.
   * @returns {void}
   */
  removeElement() {
    this.props.dispatch(ElementActions.removeElementAndPersist(this.props.targetedId, this.props.currentCanvas));
  }

  /**
   * Handler for adding an element to firebase.
   * @returns {void}
   */
  duplicateElement() {
    /* NOTE: leaving this here for ease of testing */
    /* TODO: remove before deploying */
    FBHelper.addElement(this.props.currentCanvas, 'abcd', 'http://marcoortiztorres.me/images/craftml.png', CC.INIT_POSITION, CC.INIT_SIZE, CC.INIT_ROTATION);
  }

  /**
   * Maps list item to a div to put in the drawer.
   * @param {String} item The item name to encapsulate into a ManueItem.
   * @returns {HTML} A MenuItem tag that holds the name of the item.
   */
  mapOptionToDiv(item) {
    let buttonAction = () => {};
    switch (item) {
      case CC.DELETE_ELEMENT_BUTTON:
        buttonAction = this.removeElement;
        break;
      case CC.DUPLICATE_ELEMENT_BUTTON:
        buttonAction = this.duplicateElement;
        break;
    }
    return (
      <MenuItem
        key={item.toString()}
        onClick={buttonAction}
        style={styles.menuItem}
      >
        {item}
      </MenuItem>
    );
  }

  /**
   * Mouse event that toggles sidebar open state
   * @returns {void}
   */
  handleSidebarToggle() {
    this.setState(prevState => ({
        isOpen: !prevState.isOpen,
        translateX: !prevState.isOpen ? '0px' : '-206px'
      })
    );
  }

  /**
   * Renders the HTML for the sidebar.
   * @returns {HTML} The html for the Sidebar.
   */
  render() {
    const translateX = { transform: 'translate(' + this.state.translateX + ', 0px)' };
    const toggleIcon = this.state.isOpen ? <KeyboardArrowLeft color={white} /> : <ModeEdit color={white} />

    return (
      <div>
        <Drawer
          containerStyle={Object.assign({}, styles.sidebar, translateX)}
          open={this.state.isOpen}
          openSecondary={false}
          zDepth={0}
        >
          <AppBar
            iconElementRight={
              <IconButton style={styles.toggleButton}>
                {toggleIcon}
              </IconButton>
            }
            iconStyleRight={styles.toggleEditMenu}
            onRightIconButtonTouchTap={this.handleSidebarToggle}
            showMenuIconButton={false}
            style={styles.appbar}
          />
          <Menu style={styles.propertiesSpacing}>
            {this.listItems}

            <Divider />

            <h3>Rotate</h3>
            <RotationSlider currentCanvas={this.props.currentCanvas}/>

            <Divider />

            <h3>Resize</h3>
            <TextField hintText="64px" floatingLabelText="Height" style={styles.field} />
            <TextField hintText="64px" floatingLabelText="Width" style={styles.field} />
          </Menu>
        </Drawer>
      </div>
    );
  }
}

Sidebar.propTypes = {
  currentCanvas: PropTypes.string,
  dispatch: PropTypes.func,
  targetedId: PropTypes.string
}

export default connect()(Sidebar);
