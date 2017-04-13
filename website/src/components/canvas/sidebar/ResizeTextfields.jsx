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

const styles = {
    field: {
        width: '30%'
    },
    smallIcon: {
        width: 36,
        height: 36
    },
    small: {
        width: 60,
        height: 60,
        padding: 2,
        display: 'inline-block',
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
        this.heightChangeHandler = this.heightChangeHandler.bind(this);
        this.widthChangeHandler = this.widthChangeHandler.bind(this);
        this.handleButtonAddHeight = this.handleButtonAddHeight.bind(this);
        this.handleButtonAddWidth = this.handleButtonAddWidth.bind(this);
        this.handleButtonSubHeight = this.handleButtonSubHeight.bind(this);
        this.handleButtonSubWidth = this.handleButtonSubWidth.bind(this);
    }
    /**
     * Handler for when the height field is changed.
     * @param {Object} e  The event of changing the name.
     * @param {String} newHeight The new name entered.
     * @returns {void}
     */
    heightChangeHandler(e, newHeight) {
        let newSize = {
            height: newHeight,
            width: this.props.elements[this.props.targetedId].size.width
        }
        this.props.dispatch(EA.updateAndPersist(AC.UPDATE_SIZE, this.props.targetedId, newSize, this.props.currentCanvas));
    }
    /**
     * Handler for when the width field is changed.
     * @param {Object} e  The event of changing the name.
     * @param {String} newWidth The new name entered.
     * @returns {void}
     */
    widthChangeHandler(e, newWidth) {
        let newSize = {
            height: this.props.elements[this.props.targetedId].size.height,
            width: newWidth
        }
        this.props.dispatch(EA.updateAndPersist(AC.UPDATE_SIZE, this.props.targetedId, newSize, this.props.currentCanvas));
    }
    handleButtonAddHeight(){
      let newSize = {
          height: this.props.elements[this.props.targetedId].size.height + 1,
          width: this.props.elements[this.props.targetedId].size.width
      }
      this.props.dispatch(EA.updateAndPersist(AC.UPDATE_SIZE, this.props.targetedId, newSize, this.props.currentCanvas));
    }
    handleButtonAddWidth(){
      let newSize = {
          height: this.props.elements[this.props.targetedId].size.height,
          width: this.props.elements[this.props.targetedId].size.width + 1
      }
      this.props.dispatch(EA.updateAndPersist(AC.UPDATE_SIZE, this.props.targetedId, newSize, this.props.currentCanvas));
    }
    handleButtonSubHeight(){
      let newSize = {
          height: this.props.elements[this.props.targetedId].size.height - 1,
          width: this.props.elements[this.props.targetedId].size.width
      }
      this.props.dispatch(EA.updateAndPersist(AC.UPDATE_SIZE, this.props.targetedId, newSize, this.props.currentCanvas));
    }
    handleButtonSubWidth(){
      let newSize = {
          height: this.props.elements[this.props.targetedId].size.height,
          width: this.props.elements[this.props.targetedId].size.width - 1
      }
      this.props.dispatch(EA.updateAndPersist(AC.UPDATE_SIZE, this.props.targetedId, newSize, this.props.currentCanvas));
    }
    render() {
        return (
            <div>
                <TextField onChange={this.heightChangeHandler} floatingLabelText="Height" style={styles.field}/>
                <IconButton iconStyle={styles.smallIcon} style={styles.small} onTouchTap={this.handleButtonAddHeight} >
                    <AddCircle/>
                </IconButton>
                <IconButton iconStyle={styles.smallIcon} style={styles.small} onTouchTap={this.handleButtonSubHeight}>
                    <RemoveCircle/>
                </IconButton>
                <TextField onChange={this.widthChangeHandler} floatingLabelText="Width" style={styles.field}/>
                <IconButton iconStyle={styles.smallIcon} style={styles.small} onTouchTap={this.handleButtonAddWidth}>
                    <AddCircle/>
                </IconButton>
                <IconButton iconStyle={styles.smallIcon} style={styles.small} onTouchTap={this.handleButtonSubWidth}>
                    <RemoveCircle/>
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
