/**
 * @file Buttons related to 3D preview functions.
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import CanvasOrientationBtns from './CanvasOrientationBtns';
import Render3DBtn from './Render3DBtn';

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
         autoRender={this.props.autoRender}
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
     </div>
   );
 }
}

 PreviewOptions.propTypes = {
   autoRender: PropTypes.bool,
   canvas: PropTypes.object,
   currentCanvas: PropTypes.string,
   elements: PropTypes.object,
   hasCanvasImage: PropTypes.bool,
   hasCode: PropTypes.bool,
 };

 export default connect()(PreviewOptions);
