/**
 * @file HTML generation for the Home page
 */

import React from 'react';
import { Box, Flex } from 'reflexbox';
import { Link } from 'react-router';
import { Card, CardHeader, CardMedia } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

import CoMakeServices from 'comake-services';

import ServiceEndpoint from '../../ServiceEndpoint'

const CanvasCreationService = CoMakeServices.CanvasCreationService;

const styles = {
  body: {
    textAlign: 'center',
  },
  header: {
    textAlign: 'center',
  },
  models: {
    display: 'inline-block',
    margin: 10,
  },
  overlay: {
    padding: 0,
  },
  welcome: {
    fontSize: '3.5em',
    fontWeight: 500,
    marginBottom: 20,
  },
};
/**
 * Creates unit tests for Home page.
 * @returns {string} Returns Unit test info
 */
export function homeUnitTests(){
  return true
}


/**
 * Creates a request for a new canvas.
 * @returns {null} Returns nothing
 */
function createNewCanvas(){
  const reqBody = CanvasCreationService.formRequestBody(
    'new canvas',
    '0',
    '1',
    ['0']
  );

  CanvasCreationService.sendRequest(reqBody, ServiceEndpoint, () => {});
}

const generateCanvasCode = (
    <img src="https://res.cloudinary.com/craftml/image/upload/w_250,h_250,c_fill/v1440024165/4yUaf.png" className='img-responsive' />
 );

/**
 * Generates HTML for the user canvas list.
 * @returns {canvasList}  The array holding the canvas list HTML.
 */
function generateCanvasList(){
  //TODO
  //Add firebase call to get canvas IDs and img src
  let canvasList = [];
  let numCanvases = 10;
  let numCols = 3;
  if (numCanvases > 5){
    if(numCanvases > 10){
      numCols = 1;
    }
    else{
      numCols = 2;
    }
  }
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
  return canvasList;
}

/**
 * Gives HTML for the home page after login.
 * @returns {HTML}   The HTML of the home page.
 */
function Home() {
  return (
    <Flex
      align="center"
      mt={3}
      mb={2}
      mx={6}
      justify="space-around"
      style={styles.body}
      wrap
    >
      <Box col={12} sm={12} mb={4}>
        <header style={styles.header}>
          <h1 style={styles.welcome}>Welcome to Comake</h1>
          <span>
            <Link to="/canvas">
              <RaisedButton
                label="Create New Model"
                onClick={createNewCanvas}
                secondary={true}
              />
            </Link>
          </span>
        </header>
      </Box>
      <Box col={12} sm={12}>
        <p>Pick up where you left off.</p>
      </Box>
      <div className="container">
          {generateCanvasList()}
      </div>
    </Flex>
  )
}

export default Home;
