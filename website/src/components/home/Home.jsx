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
  img: {
    height: 'auto',
    width: 100,
  },
  header: {
    textAlign: 'center',
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
  let models = [];
  for( let i = 0; i < 5; i++ ){
    models.push(
      <Box col={2} sm={4} md={2} key={i}>
        <Link to="/canvas">
          <Card>
            <CardMedia
              overlay={<CardHeader title="Racecar" />}
              overlayContentStyle={styles.overlay}
            >
              <img src="https://res.cloudinary.com/craftml/image/upload/w_250,h_250,c_fill/v1440024165/4yUaf.png" style={styles.img} />
            </CardMedia>
          </Card>
        </Link>
      </Box>
    )
  }
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
            First time user? &nbsp;&nbsp;
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
      {models}
    </Flex>
  )
}

export default Home;
