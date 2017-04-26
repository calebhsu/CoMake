/**
 * @file Button to save rendered 3D preview image.
 */

 import React, { Component, PropTypes } from 'react';
 import { connect } from 'react-redux';

 import IconButton from 'material-ui/IconButton';
 import PhotoCamera from 'material-ui/svg-icons/image/photo-camera';
 import Snackbar from 'material-ui/Snackbar';
 import { grey400, grey800 } from 'material-ui/styles/colors';

 import * as CC from '../CanvasConstants';
 import * as FBHelper from '../../../helpers/FirebaseHelper';
 import * as FBStorageHelper from '../../../helpers/FirebaseStorageHelper';

 const styles = {
   activeIcon: {
     color: grey800,
     height: 32,
     padding: 3,
     width: 32,
   },
   inactiveIcon: {
     color: grey400,
     height: 32,
     width: 32,
   },
   size: {
     display: 'block',
     height: 64,
     padding: 16,
     width: 64,
   },
 };

 /**
  * @classdesc Save image button for the 3D previewer.
   */
 class SaveImgBtn extends Component {
   /**
    * constructor for the Sidebar.
    * @param {Object} props The props to be passed in.
    */
   constructor(props) {
     super(props);
     this.state = {
       isOpen: true,
       translateX: '0px',
       snackbarOpen: false,
       disableRender: false,
     };

     this.save3DImage = this.save3DImage.bind(this);
     this.createSnackbarHandler = this.createSnackbarHandler.bind(this);
   }

   /**
    * Gets the image URL for the 3D render.
    * @returns {String}  The URL for the image.
    * @throws Will throw if canvas has not been loaded onto the page yet.
    */
   getImageURL() {
     const renderWrapper = document.getElementById(CC.RENDER_WRAPPER_ID);
     if (renderWrapper !== null) {
       const canvas = renderWrapper.getElementsByTagName('canvas')[0];
       return canvas.toDataURL();
     } else {
       throw CC.CANVAS_MISSING;
     }
   }

   /**
    * Saves off an image of the current 3D Renderer to firebase.
    * @returns {void}
    */
   save3DImage() {
     const openSnackbarHandler = this.createSnackbarHandler(true);
     let imageURL = null;
     try {
       imageURL = this.getImageURL();
     } catch(e) {
       console.error(e);
       return;
     }
     if (!this.props.hasCanvasImage) {
       FBHelper.setHasCanvasImage(this.props.currentCanvas);
     }
     const processingUpload = (snapshot) => {
       if (snapshot.state === 'paused') {
         console.error(CC.IMAGE_UPLOAD_PAUSED);
       }
     };
     const uploadSuccessful = () => {
       openSnackbarHandler();
     }
     const uploadError = () => {
       console.error(CC.IMAGE_UPLOAD_ERROR);
     }
     FBStorageHelper.saveRenderedImage(this.props.currentCanvas, imageURL,
       uploadSuccessful, uploadError, processingUpload);
   }

   /**
    * Creates a handler for opening and closing the snackbar.
    * @param {boolean} toSet Whether the handler sets the snackbar open or closed.
    * @returns {Function} The hanlder to control the snackbar.
    */
   createSnackbarHandler(toSet) {
     let handler = () => {
       this.setState({
         snackbarOpen: toSet,
       });
     }
     handler = handler.bind(this);
     return handler;
   }

   /**
    * Renders the HTML for the save image button.
    * @returns {HTML} The html for the save image button.
    */
   render() {
     return (
       <div>
         <IconButton
           disabled={!this.props.hasCode}
           iconStyle={this.props.hasCode ? styles.activeIcon : styles.inactiveIcon}
           key={CC.SAVE_3D_IMAGE_BUTTON}
           onClick={this.save3DImage}
           style={styles.size}
           tooltip="Capture Image"
           tooltipPosition="bottom-left"
           touch={true}
         >
           <PhotoCamera />
         </IconButton>
         <Snackbar
           autoHideDuration={2000}
           message={CC.IMAGE_SAVE_MESSAGE}
           onRequestClose={this.createSnackbarHandler(false)}
           open={this.state.snackbarOpen}
         />
       </div>
     );
   }
 }

 SaveImgBtn.propTypes = {
   canvas: PropTypes.object,
   currentCanvas: PropTypes.string,
   dispatch: PropTypes.func,
   targetedId: PropTypes.string,
   hasCanvasImage: PropTypes.bool,
   hasCode: PropTypes.bool,
 }

 export default connect()(SaveImgBtn);
