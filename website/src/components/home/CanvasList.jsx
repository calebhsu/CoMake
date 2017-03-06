/**
 * @file HTML generation for the canvas list
 */
 import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as firebase from 'firebase';

import { Box } from 'reflexbox';
import { Card, CardHeader, CardMedia } from 'material-ui/Card';
import { Link } from 'react-router';
import * as RC from '../../redux/reducers/ReducerConstants';
import * as CanvasActions from '../../redux/actions/CanvasActions';

const styles = {
  models: {
    display: 'inline-block',
    margin: 10,
  },
  overlay: {
    padding: 0,
    margin: 'auto',
  },
};

const generateCanvasCode = (
    <img src="https://res.cloudinary.com/craftml/image/upload/w_250,h_250,c_fill/v1440024165/4yUaf.png" className='img-responsive' />
 );


/**
 * @classdesc Component for displaying list of available canvases.
 */
 class CanvasList extends React.Component {

   /**
    * Constructor for CanvasList.
    * @param {Object} props The prop list for this component.
    * @returns {void}
    */
   constructor(props) {
     super(props);
     // Keeps track of whether we have attached listeners yet.
     this.listenersAttached = false;
   }

   /**
    * When CanvasList recieves uid, perform look up canvases from Firebase.
    * @param {Object} nextProps The next props to be passed to the component.
    * @returns {void}
    */
   componentWillReceiveProps(nextProps) {
     // Helper function that will add just canvas id/name
     const addCanvasHelper = (canvasId, canvasName) => {
       // Check if the canvas has already been added.
       const canvasKeys = Object.keys(this.props.canvases);
       if (canvasKeys.indexOf(canvasId) >= 0) {
         return;
       }
       // Otherwise dispatch action to add the canvas with just the name.
       const actionPayload = {};
       actionPayload[RC.CANVAS_NAME] = canvasName
       this.props.dispatch(CanvasActions.addCanvas(canvasId, actionPayload));
     }

     // If there is a valid username, fetch available canvas names.
     if (!this.listenersAttached && nextProps.userId) {
       // Listen for any new canvases that might be added.
       firebase.database().ref('/users').child(nextProps.userId)
         .child(RC.CANVASES).on('child_added', (canvasSnap) => {
           addCanvasHelper(canvasSnap.key, canvasSnap.val());
         });
       this.listenersAttached = true;
     }
   }

   /**
    * Stop listening for new canvases to be added once we leave home page.
    * @returns {void}
    */
   componentWillUnmount() {
     if (this.props.userId){
       firebase.database().ref('/users').child(this.props.userId)
         .child(RC.CANVASES).off()
     }
   }

  /**
   * Generates HTML for the user canvas list.
   * @returns {canvasList}  The array holding the canvas list HTML.
   */
  render() {
    console.log(this.props);
    let canvasList = [];
    let numCanvases = 7;
    let numCols = 3;
    if(numCanvases > 10)
        numCols = 1;
    else if (numCanvases > 5)
        numCols = 2;
    else
      numCols = 3;

    for (let i = 0; i < numCanvases; i++){
      canvasList.push(
        <Box col={numCols} style={styles.models} key={i}>
          <Link to="/canvas">
            <Card>
              <CardMedia
                overlay={<CardHeader title="Racecar" />}
                overlayContentStyle={styles.overlay}
              >
                {generateCanvasCode}
              </CardMedia>
            </Card>
          </Link>
        </Box>
        )
    }
    return (<div> {canvasList} </div>);
  }
}

CanvasList.propTypes = {
  dispatch: PropTypes.func,
  canvases: PropTypes.object,
  userId: PropTypes.string,
}

const mapStateToProps = state => ({
  canvases: (state.canvasReducer[RC.CANVASES]),
  userId: (state.userInfoReducer[RC.USER_INFO][RC.USER_ID]),
});

export default connect(mapStateToProps)(CanvasList);
