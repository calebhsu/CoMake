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
  closeEditBtn: {
    marginTop: 0,
  },
  editBtn: {
    backgroundColor: '#a7d2cb',
    color: white,
    height: 33,
    marginLeft: -13,
    marginTop: -15,
    padding: 10,
    width: 33
  },
  listItems: {
    marginTop: 20
  },
  menuItem: {
    color: grey900,
  },
  propertiesSpacing: {
    marginLeft: 10,
    marginRight: 20
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
    this.addElement = this.addElement.bind(this);
    this.mapOptionToDiv = this.mapOptionToDiv.bind(this);
    this.handleSidebarOpen = this.handleSidebarOpen.bind(this);
    this.handleSidebarClose = this.handleSidebarClose.bind(this);
    this.removeElement = this.removeElement.bind(this);
    this.listItems = CC.SIDEBAR_BUTTONS.map(this.mapOptionToDiv);
  }

  /**
   * Function to automatically be performed once the component mounts.
   * @returns {void}
   */
  componentWillMount() {
    this.setState({isOpen: true, closed: 0})
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
  handleSidebarClose() {
    this.setState({isOpen: false, closed: 1});
  }

  /**
  * Mouse event that opens sidebar
  * @returns {void}
  */
  handleSidebarOpen() {
    this.setState({isOpen: true, closed: 0});
  }

  /**
   * Renders the HTML for the sidebar.
   * @returns {HTML} The html for the Sidebar.
   */
  render() {
    return (
      <div>
        <IconButton iconStyle={styles.editBtn} onClick={this.handleSidebarOpen}>
          <ModeEdit />
        </IconButton>
        <Drawer
          containerStyle={styles.sidebar}
          open={this.state.isOpen}
          openSecondary={false}
          zDepth={0}
        >
          <AppBar
            iconElementRight={
              <IconButton disableTouchRipple={false}>
                <ArrowBack color={white} />
              </IconButton>}
            iconStyleRight={styles.closeEditBtn}
            onRightIconButtonTouchTap={this.handleSidebarClose}
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
            <TextField hintText="64px" floatingLabelText="Height" fullWidth={true}/>
            <TextField hintText="64px" floatingLabelText="Width" fullWidth={true}/>
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
