/**
 * @file Sidebar component holding canvas options.
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import AppBar from 'material-ui/AppBar';
import Checkbox from 'material-ui/Checkbox';
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
import * as CodeActions from '../../../redux/actions/CraftmlCodeActions';
import * as ElementActions from '../../../redux/actions/ElementActions';
import * as CC from '../CanvasConstants';
import * as FBHelper from '../../../helpers/FirebaseHelper';
import * as FBStorageHelper from '../../../helpers/FirebaseStorageHelper';
import { generateScript } from '../../../craftml/ScriptGenerator';


const styles = {
  appbar: {
    backgroundColor: '#a7d2cb',
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
    position: 'absolute',
    top: 55,
    padding: 12,
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
  renderCheckboxLabel: {
    color: grey900,
    paddingBottom: 10,
    paddingLeft: 16,
  },
  unchecked: {
    fill: grey900,
  },
  checked: {
    fill: '#e74c49',
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

    this.addElement = this.addElement.bind(this);
    this.updateCraftmlCode = this.updateCraftmlCode.bind(this);
    this.clearCraftmlCode = this.clearCraftmlCode.bind(this);
    this.toggleAutoRender = this.toggleAutoRender.bind(this);
    this.mapOptionToDiv = this.mapOptionToDiv.bind(this);
    this.handleSidebarToggle = this.handleSidebarToggle.bind(this);
    this.removeElement = this.removeElement.bind(this);
    this.save3DImage = this.save3DImage.bind(this);
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
   * Handler for updating craftml code (triggers 3D rerender).
   * @returns {void}
   */
  updateCraftmlCode() {
    const newCode = generateScript(this.props.elements);
    this.props.dispatch(CodeActions.setCode(newCode));
  }

  /**
   * Handler for clearing the 3D model i.e. clearing the craftml code.
   * @returns {void}
   */
  clearCraftmlCode() {
    this.props.dispatch(CodeActions.setCode(''));
  }

  /**
   * Handler that toggles whether the 3D model should be auto rendered.
   * @returns {void}
   */
  toggleAutoRender() {
    if (!this.props.autoRender) {
      this.updateCraftmlCode();
    }
    this.props.dispatch(CodeActions.setAutoCodeUpdate(!this.props.autoRender));
  }

  /**
   * Gets the image URL for the 3D render.
   * @returns {String}  The URL for the image.
   * @throws Will throw if canvas has not been loaded onto the page yet.
   */
  getImageURL() {
    const renderWrapper = document.getElementById(CC.RENDER_WRAPPER_ID);
    if (renderWrapper !== null) {
      const canvas = renderWrapper.getElementsByTagName('canvas')[0];
      return canvas.toDataURL();
    } else {
      throw CC.CAPTURE_IMAGE_ERROR;
    }
  }

  /**
   * Saves off an image of the current 3D Renderer to firebase.
   * @returns {void}
   */
  save3DImage() {
    let imageURL = null;
    try {
      imageURL = this.getImageURL();
    } catch(e) {
      console.log(e);
      return;
    }
    FBStorageHelper.saveRenderedImage(this.props.currentCanvas, imageURL, () => {
      console.log('Successfully saved!');
    }, (error) => {
      console.log('Error!');
      console.log(error);
    }, (snapshot) => {
      if (snapshot.state === FBStorageHelper.PAUSED) {
        console.log('Upload paused.');
      }
    });
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

            <Divider />

            <h3>Rendering</h3>
            <Checkbox
              label={CC.AUTO_RENDER_CHECKBOX}
              checked={this.props.autoRender}
              onCheck={this.toggleAutoRender}
              labelStyle={styles.renderCheckboxLabel}
              iconStyle={this.props.autoRender ? styles.checked : styles.unchecked}
              labelPosition={CC.AUTO_RENDER_LABEL_POSITION}
            />
            <MenuItem
              key={CC.RENDER_BUTTON}
              onClick={this.updateCraftmlCode}
              style={styles.menuItem}
            >
              {CC.RENDER_BUTTON}
            </MenuItem>
            <MenuItem
              key={CC.CLEAR_3D_BUTTON}
              onClick={this.clearCraftmlCode}
              style={styles.menuItem}
            >
              {CC.CLEAR_3D_BUTTON}
            </MenuItem>
            <MenuItem
              key={CC.SAVE_3D_IMAGE_BUTTON}
              onClick={this.save3DImage}
              style={styles.menuItem}
            >
              {CC.SAVE_3D_IMAGE_BUTTON}
            </MenuItem>


          </Menu>
        </Drawer>
      </div>
    );
  }
}

Sidebar.propTypes = {
  currentCanvas: PropTypes.string,
  dispatch: PropTypes.func,
  targetedId: PropTypes.string,
  elements: PropTypes.object,
  autoRender: PropTypes.bool,
}

export default connect()(Sidebar);
