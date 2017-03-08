/**
 * @file Modal component for importing model image by ID from CraftML.
 */

 import React, { Component } from 'react';

 import Dialog from 'material-ui/Dialog';
 import FlatButton from 'material-ui/FlatButton';
 import TextField from 'material-ui/TextField';

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
 class ImportModal extends Component {

   /**
    * Constructor for ImportModal
    * @param {Object} props The props for the ImportModal.
    */
   constructor(props) {
     super(props);
     this.state = {
       open: false,
     };
     this.handleClose = this.handleClose.bind(this);
     this.handleOpen = this.handleOpen.bind(this);
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
         labelStyle={styles.shareBtn}
         onTouchTap={this.handleClose}
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
           />
         </Dialog>
       </div>
     );
   }
 }

 export default ImportModal;
