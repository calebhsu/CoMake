/**
 * @file HTML generation for the Home page
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import CoMakeServices from 'comake-services';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';

import * as RC from '../../redux/reducers/ReducerConstants';
import ServiceEndpoint from '../../ServiceEndpoint'

const CanvasCreationService = CoMakeServices.CanvasCreationService;

class CreateCanvas extends React.Component {

  constructor(props) {
    super(props);

    this.createNewCanvas = this.createNewCanvas.bind(this);
  }

  /**
   * Creates a request for a new canvas.
   * @returns {null} Returns nothing
   */
  createNewCanvas() {
    if(!this.props.userId) {
      return;
    }

    const reqBody = CanvasCreationService.formRequestBody(
      'Untitled',
      this.props.userId,
      []
    );

    CanvasCreationService.sendRequest(reqBody, ServiceEndpoint, () => {});
  }

  render() {
    return(
  		<span>
        <Link to="/canvas">
          <RaisedButton
            label="New Canvas"
            onClick={this.createNewCanvas}
            secondary={true}
          />
        </Link>
      </span>
    )
  }
}

CreateCanvas.propTypes = {
  userId: PropTypes.string,
};

const mapStateToProps = (state) => ({
  userId: state.userInfoReducer[RC.USER_INFO][RC.USER_ID],
});

export default connect(mapStateToProps)(CreateCanvas);
