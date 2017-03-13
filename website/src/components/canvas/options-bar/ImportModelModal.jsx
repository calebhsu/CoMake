/**
 * @file Modal component for importing model image by ID from CraftML.
 */

 import React, { Component, PropTypes } from 'react';
 import { connect } from 'react-redux';

 import CoMakeServices from 'comake-services';

 import Dialog from 'material-ui/Dialog';
 import FlatButton from 'material-ui/FlatButton';
 import TextField from 'material-ui/TextField';

 import * as CC from '../CanvasConstants';
 import * as FBHelper from '../../../helpers/FirebaseHelper';

 const ModelImportService = CoMakeServices.ModelImportService;

 const styles = {
   actionBtn: {
     marginLeft: 6,
   },
   dialogActions: {
     padding: '8px 15px 15px',
   },
   dialogBody: {
     padding: '0 32px 24px',
   },
   importBtn: {
     color: '#FFFFFF',
     fontWeight: 700,
   },
   wrapper: {
     display: 'inline-block',
   },
 };

 /**
  * Gives HTML for model import modal.
  * @returns {HTML}   The HTML of the model import modal.
  */
 class ImportModelModal extends Component {

   /**
    * Constructor for ImportModal
    * @param {Object} props The props for the ImportModal.
    */
   constructor(props) {
     super(props);
     this.state = {
       modelIdText: null,
       open: false,
     };
     this.handleClose = this.handleClose.bind(this);
     this.handleOpen = this.handleOpen.bind(this);
     this.importModel = this.importModel.bind(this);
     this.updateModelIdText = this.updateModelIdText.bind(this);
   }

   /**
   * Handler for onTouchTap that sets modal's open state to false.
   * @returns {void}
   */
   handleClose() {
     this.setState({open: false});
   }

   /**
    * Handler for onTouchTap that sets modal's open state to true.
    * @returns {void}
    */
   handleOpen() {
     this.setState({open: true});
   }

   /**
    * Imports model image from CraftML using model ID found in the modelId state value
    * Triggered By: Import button onTouchTapEvent
    * @returns {void}
    */
   importModel() {
      if(!this.props.currentCanvas) { return; }

      const modelId = ModelImportService.formRequestBody(this.state.modelIdText);

      /* TODO: figure out how to preserve aspect ratio of imported module imgs
       * ...it's different for every image */
      const INIT_SIZE = {
        'width': 300,
        'height': 160,
      }

      ModelImportService.sendRequest(modelId, (imgPath) => {
        FBHelper.addElement(this.props.currentCanvas, modelId, imgPath,
          CC.INIT_POSITION, INIT_SIZE, CC.INIT_ROTATION);
      });

      this.handleClose();
    }

    /**
     * Updates the modelId state value
     * Triggered By: TextField onBlur event
     * @param {Event} event the onBlur event from the TextField element
     * @returns {void}
     */
     updateModelIdText(event) {
       this.setState({modelIdText: event.target.value});
     }

   /**
    * Renders the import model modal for display.
    * @returns {HTML} The rendered HTML of the modal.
    */
   render() {
     const actions = [
       <FlatButton
         label="Cancel"
         primary={true}
         onTouchTap={this.handleClose}
       />,
       <FlatButton
         backgroundColor="#229bc8"
         hoverColor="#0d7faa"
         label="Import"
         labelStyle={styles.importBtn}
         onTouchTap={this.importModel}
         style={styles.actionBtn}
       />,
     ];

     return (
       <div style={styles.wrapper}>
         <FlatButton
           label="Import"
           onTouchTap={this.handleOpen}
         />
         <Dialog
           actions={actions}
           actionsContainerStyle={styles.dialogActions}
           bodyStyle={styles.dialogBody}
           modal={false}
           open={this.state.open}
           onRequestClose={this.handleClose}
           title="Import a Model from CraftML"
         >
           <TextField
             floatingLabelText="Model ID"
             floatingLabelFixed={true}
             fullWidth={true}
             hintText="9dKZ3"
             onBlur={this.updateModelIdText}
           />
         </Dialog>
       </div>
     );
   }
 }

 ImportModelModal.propTypes = {
   currentCanvas: PropTypes.string,
   dispatch: PropTypes.func,
 }

 export default connect()(ImportModelModal);
