/**
 * @file Component for removing canvases from user lists
 */

import * as firebase from 'firebase';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';

import * as CanvasActions from '../../redux/actions/CanvasActions';
import * as RC from '../../redux/reducers/ReducerConstants';

class ArchiveCanvas extends React.Component {

  constructor(props) {
    super(props);

    this.archiveCanvas = this.archiveCanvas.bind(this);
  }

  /**
   * Creates a request to remove a canvas from a user's list of canvases
   * @returns {null} Returns nothing
   */
  archiveCanvas() {
    if((!this.props.userId)||(!this.props.canvasId)) {
      return;
    }

    firebase.database().ref(`/users/${this.props.userId}/canvases/${this.props.canvasId}`).once('value')
      .then((canvasSnap) => {
        console.log(canvasSnap);
        document.location = '/#/home';
      });
  }

  render() {
    return(
  		<span>
        <RaisedButton
          label="New Canvas"
          onClick={this.archiveCanvas}
          secondary={true}
        />
      </span>
    )
  }
}

ArchiveCanvas.propTypes = {
  dispatch: PropTypes.func,
  userId: PropTypes.string,
};

const mapStateToProps = (state) => ({
  userId: state.userInfoReducer[RC.USER_INFO][RC.USER_ID],
  canvasId: stat.userInfoReducer[RC.CURRENT_CANVAS],
});

export default connect(mapStateToProps)(ArchiveCanvas);
