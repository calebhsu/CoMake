import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import ArrowBack from 'material-ui/svg-icons/Navigation/arrow-back';
import ArrowForward from  'material-ui/svg-icons/Navigation/arrow-forward';
import Drawer from 'material-ui/Drawer';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';

import RotationSlider from './RotationSlider';
import * as ElementActions from '../../redux/actions/ElementActions';
import * as CC from './CanvasConstants';
import * as FBHelper from '../../helpers/FirebaseHelper';

const styles = {
  arrowIcon: {
    width: 33,
    height: 33,
  },
  arrowOpen: {
    width: 33,
    height: 33,
    marginLeft: -13,
    marginTop: -18,
    padding: 10,
    backgroundColor: '#FFFFFF',
  },
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
      opacity: .7,
    }
    this.mouseEnter = this.mouseEnter.bind(this);
    this.mouseLeave = this.mouseLeave.bind(this);
    this.onClickOpen = this.onClickOpen.bind(this);
    this.onClickClose = this.onClickClose.bind(this);
    this.removeElement = this.removeElement.bind(this);
    this.addElement = this.addElement.bind(this);
    this.mapOptionToDiv = this.mapOptionToDiv.bind(this);
    this.listItems = CC.SIDEBAR_BUTTONS.map(this.mapOptionToDiv);

    }
    componentDidMount(){
      this.setState({
        isOpen: true,
        closed: 0
      })
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
    FBHelper.addElement(this.props.currentCanvas, 'abcd',
      CC.INIT_POSITION, CC.INIT_SIZE, CC.INIT_ROTATION);
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
  onClickClose() {
   this.setState(prevState => ({
     isOpen: !prevState.isOpen,
     closed: 1
   }));
 }
 onClickOpen() {
  this.setState(prevState => ({
    isOpen: !prevState.isOpen,
    closed: 0
  }));
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
       <IconButton
        iconStyle={styles.arrowOpen}
        tooltip="Show sidebar"
        tooltipPosition="bottom-right"
        onClick={this.onClickOpen}
        style={{opacity: this.state.closed}}>
        {this.state.closed ? 0 : 1}
        <ArrowForward/>
      </IconButton>
        <Drawer containerStyle={styles.sidebar}
                open= {this.state.isOpen}
                docked={true}
                openSecondary={false}
                style={{opacity: this.state.opacity}}
                zDepth={0}>
          <div
          style={styles.propertiesSpacing}>
          <ul>
            <IconButton
              iconStyle={styles.arrowIcon}
              tooltip="hide sidebar"
              tooltipPosition="bottom-right"
              onClick={this.onClickClose}
              >
              <ArrowBack/>
            </IconButton>
          </ul>
          <ul>
            {this.listItems}
            <li>
              <h3>Rotate</h3>
            </li>
              <RotationSlider
                currentCanvas={this.props.currentCanvas}
              />
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
