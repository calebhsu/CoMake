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
import { black, white, grey900 } from 'material-ui/styles/colors';

import ResizeTextfields from './ResizeTextfields';
import RotationSlider from './RotationSlider';

import { generateScript } from '../../../craftml/ScriptGenerator';
import { CANVAS_ORIENTATION } from '../../../redux/reducers/ReducerConstants';
import * as CC from '../CanvasConstants';
import * as CodeActions from '../../../redux/actions/CraftmlCodeActions';
import * as ElementActions from '../../../redux/actions/ElementActions';
import * as FBHelper from '../../../helpers/FirebaseHelper';

const styles = {
  appbar: {
    backgroundColor: '#a7d2cb',
    height: 49,
  },
  toggleEditMenu: {
    marginTop: -1,
    paddingLeft: 5,
  },
  listItems: {
    marginTop: 20
  },
  menuItem: {
    color: grey900,
  },
  disabledMenuItem: {
    color: grey900,
    opacity: 0.5,
    cursor: 'default',
  },
  menu: {
    marginLeft: 20,
    marginRight: 20,
  },
  renderCheckboxLabel: {
    color: grey900,
    paddingBottom: 10,
    paddingLeft: 16,
    width: 'calc(100% - 90px)',
  },
  sidebar: {
    backgroundColor: '#EFEFEF',
    color: black,
    marginTop: 56,
    overflowY: 'auto',
    paddingBottom: 56,
    position: 'fixed',
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
      disableRender: false,
    };

    this.cloneElement = this.cloneElement.bind(this);
    this.updateCraftmlCode = this.updateCraftmlCode.bind(this);
    this.toggleAutoRender = this.toggleAutoRender.bind(this);
    this.handleSidebarToggle = this.handleSidebarToggle.bind(this);
    this.removeElement = this.removeElement.bind(this);
  }

  /**
   * Function that will delete the current targeted element.
   * @returns {void}
   */
  removeElement() {
    if (this.props.targetedId) {
      this.props.dispatch(ElementActions.removeElementAndPersist(this.props.targetedId,
        this.props.currentCanvas));
    }
  }

  /**
   * Handler for cloning a targeted element.
   * @returns {void}
   */
  cloneElement() {
    if (this.props.targetedId in this.props.elements) {
      const targetElement = this.props.elements[this.props.targetedId];
      FBHelper.cloneElement(this.props.currentCanvas, targetElement,
        CC.INIT_POSITION);
    }
  }

  /**
   * Handler for updating craftml code (triggers 3D rerender).
   * @returns {void}
   */
  updateCraftmlCode() {
    const newCode = generateScript(this.props.elements, this.props.canvas[CANVAS_ORIENTATION]);
    this.props.dispatch(CodeActions.setCode(newCode));
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
          <Menu
            style={styles.menu}
            disableAutoFocus={true}
          >
            <MenuItem
              onClick={this.cloneElement}
              style={this.props.targetedId === null ? styles.disabledMenuItem : styles.menuItem}
            >
              {CC.CLONE_ELEMENT_BUTTON}
            </MenuItem>

            <MenuItem
              onClick={this.removeElement}
              style={this.props.targetedId === null ? styles.disabledMenuItem : styles.menuItem}
            >
              {CC.DELETE_ELEMENT_BUTTON}
            </MenuItem>

            <Divider />

            <h3>Rotate</h3>
            <RotationSlider currentCanvas={this.props.currentCanvas}/>

            <Divider />

            <h3>Resize</h3>
            <ResizeTextfields
              targetedId={this.props.targetedId}
              currentCanvas={this.props.currentCanvas}
              elements={this.props.elements}
            />
            <Divider />

            <h3>3D Previewer</h3>
            <Checkbox
              checked={this.props.autoRender}
              label={CC.AUTO_RENDER_CHECKBOX}
              labelPosition={CC.AUTO_RENDER_LABEL_POSITION}
              labelStyle={styles.renderCheckboxLabel}
              onCheck={this.toggleAutoRender}
            />
          </Menu>
        </Drawer>
      </div>
    );
  }
}

Sidebar.propTypes = {
  canvas: PropTypes.object,
  currentCanvas: PropTypes.string,
  dispatch: PropTypes.func,
  targetedId: PropTypes.string,
  elements: PropTypes.object,
  autoRender: PropTypes.bool,
  hasCanvasImage: PropTypes.bool,
  hasCode: PropTypes.bool,
}

export default connect()(Sidebar);
