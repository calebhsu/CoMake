/**
 * @file Component with textfields to resize canvas elements by height and width
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import TextField from 'material-ui/TextField';

import * as AC from '../../../redux/actions/ActionConstants';
import * as EA from '../../../redux/actions/ElementActions';

const styles = {
    field: {
        width: '90%'
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
    }
    heightChangeHandler(e, newHeight) {
        let newSize = {
            height: newHeight,
            width: this.props.elements[this.props.targetedId].size.width
        }
        this.props.dispatch(EA.updateAndPersist(AC.UPDATE_SIZE, this.props.targetedId, newSize, this.props.currentCanvas));
    }

    widthChangeHandler(e, newWidth) {
        let newSize = {
            height: this.props.elements[this.props.targetedId].size.height,
            width: newWidth
        }
        this.props.dispatch(EA.updateAndPersist(AC.UPDATE_SIZE, this.props.targetedId, newSize, this.props.currentCanvas));
    }
    render() {
        return (
            <div>
                <TextField
                  onChange={this.heightChangeHandler}
                  floatingLabelText="Height"
                  style={styles.field}
                />

                <TextField
                  onChange={this.widthChangeHandler}
                  floatingLabelText="Width"
                  style={styles.field}
                />
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
