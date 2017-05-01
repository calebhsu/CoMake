/**
 * @file Buttons related to 3D preview functions.
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import CanvasOrientationBtns from './CanvasOrientationBtns';
import Render3DBtn from './Render3DBtn';
import SaveImgBtn from './SaveImgBtn';

const styles = {
  previewOptions: {
    backgroundColor: '#eeeeee',
    display: 'inline',
    zIndex: 100,
  },
};

class PreviewOptions extends Component {
 /**
  * Gives HTML for the 3d preview options
  * @returns {HTML}   The HTML of the 3d preview options
  */
 render() {
   return (
     <div style={styles.previewOptions}>
       <Render3DBtn
         canvas={this.props.canvas}
         currentCanvas={this.props.currentCanvas}
         elements={this.props.elements}
         hasCode={this.props.hasCode}
         hasCanvasImage={this.props.hasCanvasImage}
       />
       <CanvasOrientationBtns
         canvas={this.props.canvas}
         currentCanvas={this.props.currentCanvas}
       />
       <SaveImgBtn
         currentCanvas={this.props.currentCanvas}
         hasCode={this.props.hasCode}
         hasCanvasImage={this.props.hasCanvasImage}
       />
     </div>
   );
 }
}

 PreviewOptions.propTypes = {
   canvas: PropTypes.object,
   currentCanvas: PropTypes.string,
   dispatch: PropTypes.func,
   elements: PropTypes.object,
   hasCanvasImage: PropTypes.bool,
   hasCode: PropTypes.bool,
 };

 export default connect()(PreviewOptions);
