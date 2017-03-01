/**
 * @file HTML generation for the Home page
 */

import React from 'react';
import { Box, Flex } from 'reflexbox';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import CanvasList from '../canvas/CanvasList';
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
    margin: 15,
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
        <CanvasList />
      </div>
    </Flex>
  )
}

export default Home;
