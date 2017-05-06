/**
 * @file Component with textfields to resize canvas elements by height and width
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import AddCircle from 'material-ui/svg-icons/content/add-circle';
import IconButton from 'material-ui/IconButton';
import RemoveCircle from 'material-ui/svg-icons/content/remove-circle';
import TextField from 'material-ui/TextField';

import {
  MIN_DIM, MAX_WIDTH, MAX_HEIGHT
} from '../CanvasConstants';

import * as AC from '../../../redux/actions/ActionConstants';
import * as EA from '../../../redux/actions/ElementActions';

const HEIGHT = 'height';
const ONE_UNIT = 10;
const WIDTH = 'width';
const styles = {
    field: {
        width: '45%'
    },
    smallIcon: {
        height: 24,
        width: 24
    },
    small: {
        display: 'inline-block',
        height: 48,
        paddingLeft: 2,
        paddingRight: 2,
        paddingBottom: 0,
        width: 48
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
      if(newHeight < MIN_DIM) {
        newHeight = MIN_DIM;
      }
      if(newHeight > MAX_HEIGHT) {
        newHeight = MAX_HEIGHT;
      }
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
      if(newWidth < MIN_DIM) {
        newWidth = MIN_DIM;
      }
      if(newWidth > MAX_WIDTH) {
        newWidth = MAX_WIDTH;
      }

      const newFieldSize = {
          height: this.props.elements[this.props.targetedId].size.height,
          width: parseInt(newWidth)
      };

      this.props.dispatch(EA.updateAndPersist(AC.UPDATE_SIZE,
        this.props.targetedId, newFieldSize, this.props.currentCanvas));
    }
    render() {
        const disableTextfields = this.props.targetedId === null;

        let elementHeight = '';
        let elementWidth = '';
        if (this.props.elements &&
            this.props.elements[this.props.targetedId]) {
              elementHeight = this.props.elements[this.props.targetedId].size.height;
              elementWidth = this.props.elements[this.props.targetedId].size.width;
        }

        return (
            <div>
                <IconButton
                  disabled={disableTextfields}
                  iconStyle={styles.smallIcon}
                  onTouchTap={this.generateButtonHandler(-1 * ONE_UNIT, HEIGHT)}
                  style={styles.small}
                >
                    <RemoveCircle/>
                </IconButton>
                <TextField
                  value={elementHeight}
                  disabled={disableTextfields}
                  floatingLabelText="Height"
                  onChange={this.handlerTextfieldHeight}
                  style={styles.field}
                />
                <IconButton
                  disabled={disableTextfields}
                  iconStyle={styles.smallIcon}
                  onTouchTap={this.generateButtonHandler(ONE_UNIT, HEIGHT)}
                  style={styles.small}
                >
                    <AddCircle/>
                </IconButton>
                <br />
                <IconButton
                  disabled={disableTextfields}
                  iconStyle={styles.smallIcon}
                  onTouchTap={this.generateButtonHandler(-1 * ONE_UNIT, WIDTH)}
                  style={styles.small}
                >
                    <RemoveCircle/>
                </IconButton>
                <TextField
                  value={elementWidth}
                  disabled={disableTextfields}
                  floatingLabelText="Width"
                  onChange={this.handlerTextfieldWidth}
                  style={styles.field}
                />
                <IconButton
                  disabled={disableTextfields}
                  iconStyle={styles.smallIcon}
                  onTouchTap={this.generateButtonHandler(ONE_UNIT, WIDTH)}
                  style={styles.small}
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
