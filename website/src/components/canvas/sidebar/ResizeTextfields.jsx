/**
 * @file Component with textfields to resize canvas elements by height and width
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import AddCircle from 'material-ui/svg-icons/content/add-circle';
import IconButton from 'material-ui/IconButton';
import RemoveCircle from 'material-ui/svg-icons/content/remove-circle';
import TextField from 'material-ui/TextField';

import * as AC from '../../../redux/actions/ActionConstants';
import * as EA from '../../../redux/actions/ElementActions';


const ONE_UNIT = 1;
const HEIGHT = 'height';
const WIDTH = 'width';
const styles = {
    field: {
        width: '25%'
    },
    smallIcon: {
        height: 36,
        width: 36
    },
    small: {
        display: 'inline-block',
        height: 60,
        paddingLeft: 2,
        paddingRight: 2,
        paddingBottom: 0,
        width: 60
    }
};

/**
* Component of reisze textfields
*/
class ResizeTextfields extends React.Component {
    /**
   * Constructor for ResizeTextfields
   * @param {Object} props The props for the ResizeTextfields.
   */

    constructor(props) {
        super(props);
        this.state = {
          disableTextfields: true,
         };
        this.generateButtonHandler = this.generateButtonHandler.bind(this);
        this.handlerTextfieldHeight = this.handlerTextfieldHeight.bind(this);
        this.handlerTextfieldWidth = this.handlerTextfieldWidth.bind(this);
    }
    /**
     * Function to automatically be performed once the component mount.
     * Used here to initialize canvas elements if not done and if the new canvas id
     * is not null
     * @returns {void}
     */
    componentDidMount() {
      if(this.props.targetedId !== null) {
        this.setState({
          disableTextfields: false,
        });
      }
      else{
        this.setState({
          disableTextfields: true,
        });
      }
    }
    /**
     * Function to automatically be performed once the component receives new props.
     * Used here to see if user has clicked on an item in the canvas (targetedId) else
     * it will disable the sidebar items here
     * @param {Object} nextProps The new props object to be given to the component
     * @returns {void}
     */
    componentWillReceiveProps(nextProps) {
      if(nextProps.targetedId !== null) {
        this.setState({
          disableTextfields: false,
        });
      }
      else{
        this.setState({
          disableTextfields: true,
        });
      }
    }
    /**
     * Generic button handler for when the height field is changed.
     * @param {value} changeAmount numerical value for width/height change
     * @param {String} widthOrHeight specifies whether height or width should be changed
     * @returns {handler} returns promise
     */
    generateButtonHandler(changeAmount, widthOrHeight) {
      const handler = () => {

        const newSize = this.props.elements[this.props.targetedId].size;
        newSize[widthOrHeight] += parseInt(changeAmount);
        this.props.dispatch(EA.updateAndPersist(AC.UPDATE_SIZE,
          this.props.targetedId, newSize, this.props.currentCanvas));
      }
      return handler;
    }
    /**
     * Handler for when the height field is changed.
     * @param {Object} e  The event of changing the name.
     * @param {String} newHeight The new name entered.
     * @returns {void}
     */
    handlerTextfieldHeight(e, newHeight) {
      const newFieldSize = {
          height: parseInt(newHeight),
          width: this.props.elements[this.props.targetedId].size.width
      };

      this.props.dispatch(EA.updateAndPersist(AC.UPDATE_SIZE,
        this.props.targetedId, newFieldSize, this.props.currentCanvas));
    }
    /**
     * Handler for when the width field is changed.
     * @param {Object} e  The event of changing the name.
     * @param {String} newWidth The new name entered.
     * @returns {void}
     */
    handlerTextfieldWidth(e, newWidth) {
      const newFieldSize = {
          height: this.props.elements[this.props.targetedId].size.height,
          width: parseInt(newWidth)
      };

      this.props.dispatch(EA.updateAndPersist(AC.UPDATE_SIZE,
        this.props.targetedId, newFieldSize, this.props.currentCanvas));
    }
    render() {
        return (
            <div>
                <IconButton
                  iconStyle={styles.smallIcon}
                  style={styles.small}
                  onTouchTap={this.generateButtonHandler(-1 * ONE_UNIT, HEIGHT)}
                  disabled={this.state.disableTextfields}
                >
                    <RemoveCircle/>
                </IconButton>
                <TextField
                  onChange={this.handlerTextfieldHeight}
                  floatingLabelText="Height"
                  style={styles.field}
                  disabled={this.state.disableTextfields}
                />
                <IconButton
                  iconStyle={styles.smallIcon}
                  style={styles.small}
                  onTouchTap={this.generateButtonHandler(ONE_UNIT, HEIGHT)}
                  disabled={this.state.disableTextfields}
                >
                    <AddCircle/>
                </IconButton>
                <IconButton
                  iconStyle={styles.smallIcon}
                  style={styles.small}
                  onTouchTap={this.generateButtonHandler(-1 * ONE_UNIT, WIDTH)}
                  disabled={this.state.disableTextfields}
                >
                    <RemoveCircle/>
                </IconButton>
                <TextField
                  onChange={this.handlerTextfieldWidth}
                  floatingLabelText="Width"
                  style={styles.field}
                  disabled={this.state.disableTextfields}
                />
                <IconButton
                  iconStyle={styles.smallIcon}
                  style={styles.small}
                  onTouchTap={this.generateButtonHandler(ONE_UNIT, WIDTH)}
                  disabled={this.state.disableTextfields}
                >
                    <AddCircle/>
                </IconButton>
            </div>
        );
    }
}

ResizeTextfields.propTypes = {
    currentCanvas: PropTypes.string,
    dispatch: PropTypes.func,
    targetedId: PropTypes.string,
    elements: PropTypes.object
}

export default connect()(ResizeTextfields);
