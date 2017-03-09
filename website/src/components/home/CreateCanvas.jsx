/**
 * @file HTML generation for the Home page
 */

import React from 'react';
import CoMakeServices from 'comake-services';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import ServiceEndpoint from '../../ServiceEndpoint'

const CanvasCreationService = CoMakeServices.CanvasCreationService;

/**
 * Creates a request for a new canvas.
 * @returns {null} Returns nothing
 */
function CreateNewCanvas(){
  const reqBody = CanvasCreationService.formRequestBody(
    'Untitled',
    '0',
    []
  );

  CanvasCreationService.sendRequest(reqBody, ServiceEndpoint, () => {});
}

/**
 * Returns the HTML for CreateCanvas
 * @return {HTML} The HTML for CreateCanvas
 */
function CreateCanvas() {
	return(
		<span>
      <Link to="/canvas">
        <RaisedButton
            label="New Canvas"
            onClick={CreateNewCanvas}
            secondary={true}
        />
      </Link>
    </span>
    )
}

export default CreateCanvas;
