import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import AppBar from 'material-ui/AppBar';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import IconButton from 'material-ui/IconButton';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import { black, white, grey900 } from 'material-ui/styles/colors';

import RotationSlider from './RotationSlider';
import * as ElementActions from '../../../redux/actions/ElementActions';
import * as CC from '../CanvasConstants';
import * as FBHelper from '../../../helpers/FirebaseHelper';

const styles = {
  appbar: {
    backgroundColor: '#a7d2cb',
    height: 40,
  },
  toggleEditMenu: {
    marginTop: -3,
  },
  editBtn: {
    color: '#e74c49',
    height: 25,
    marginLeft: -13,
    top: 55,
    padding: 12,
    position: 'absolute',
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
    color: black,
    backgroundColor: '#EFEFEF',
    height: '89vh',
    marginTop: 55,
    overflowX: 'hidden',
    position: 'absolute'
  }
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

    this.addElement = this.addElement.bind(this);
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
  addElement() {
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
      case CC.ADD_ELEMENT_BUTTON:
        buttonAction = this.addElement;
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
   * Mouse event that closes sidebar
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
              <IconButton>
                <ModeEdit color={white} />
              </IconButton>}
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
