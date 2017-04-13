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
        height: 36,
        width: 36
    },
    small: {
        display: 'inline-block',
        height: 60,
        padding: 2,
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
        this.generateButtonHandler = this.generateButtonHandler.bind(this);
        this.handlerTextfieldHeight = this.handlerTextfieldHeight.bind(this);
        this.handlerTextfieldWidth = this.handlerTextfieldWidth.bind(this);
    }

    /**
     * Generic button handler for when the height field is changed.
     * @param {value} changeAmount numerical value for width/height change
     * @param {String} widthOrHeight specifies whether height or width should be changed
     * @returns {void}
     */
    generateButtonHandler(changeAmount, widthOrHeight) {
      const handler = () => {
        const newSize = this.props.elements[this.props.targetedId].size;
        newSize[widthOrHeight] += changeAmount;
        console.log(widthOrHeight);
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
          height: newHeight,
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
          width: newWidth
      };
      this.props.dispatch(EA.updateAndPersist(AC.UPDATE_SIZE,
        this.props.targetedId, newFieldSize, this.props.currentCanvas));
    }
    render() {
        const oneUnit = 1;
        const h = 'height';
        const w = 'width';
        return (
            <div>
                <TextField
                  onChange={this.handlerTextfieldHeight}
                  floatingLabelText="Height"
                  style={styles.field}
                />
                <IconButton
                  iconStyle={styles.smallIcon}
                  style={styles.small}
                  onTouchTap={this.generateButtonHandler(oneUnit, h)}
                >
                    <AddCircle/>
                </IconButton>
                <IconButton
                  iconStyle={styles.smallIcon}
                  style={styles.small}
                  onTouchTap={this.generateButtonHandler(-1 * oneUnit, h)}
                >
                    <RemoveCircle/>
                </IconButton>
                <TextField
                  onChange={this.handlerTextfieldWidth}
                  floatingLabelText="Width"
                  style={styles.field}
                />
                <IconButton
                  iconStyle={styles.smallIcon}
                  style={styles.small}
                  onTouchTap={this.generateButtonHandler(oneUnit, w)}
                >
                    <AddCircle/>
                </IconButton>
                <IconButton
                  iconStyle={styles.smallIcon}
                  style={styles.small}
                  onTouchTap={this.generateButtonHandler(-1 * oneUnit, w)}
                >
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
