import React from 'react';
import { Box, Flex } from 'reflexbox';
import { Link } from 'react-router';

import ContentAdd from 'material-ui/svg-icons/content/add';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Paper from 'material-ui/Paper';

import CoMakeServices from 'comake-services';

const CanvasCreationService = CoMakeServices.CanvasCreationService;

const styles = {
  container: {
    marginTop: 15,
  },
  header: {
    backgroundColor: '#49937f',
    color: '#FFFFFF',
    marginTop: 0,
    padding: '15px 10px',
    textTransform: 'uppercase',
  },
  paper: {
    display: 'inline-block',
    height: '85vh',
    margin: 30,
    minHeight: 500,
    textAlign: 'center',
    width: '90%',
  }
};

function createNewCanvas(){
  const reqBody = CanvasCreationService.formRequestBody('new canvas', '0', '1', ['0']);

  const endpoint = {
    host: 'comakeserver.herokuapp.com'
  };

  CanvasCreationService.sendRequest(reqBody, endpoint, () => {});
}

/**
 * Gives HTML for the home page after login.
 * @returns {HTML}   The HTML of the home page.
 */
function Home() {
  return (
    <div>
      <Flex
        align="stretch"
        justify="space-around"
        style={styles.container}
        wrap
      >
        <Box col={12} sm={12} md={6}>
          <Paper style={styles.paper} zDepth={2}>
            <h2 style={styles.header}>Your Work</h2>
            <Link to="/canvas">
              <FloatingActionButton
                secondary={true}
                style={styles.newCanvas}
                onClick={createNewCanvas}
              >
                <ContentAdd />
              </FloatingActionButton>
            </Link>
          </Paper>
        </Box>
        <Box col={12} sm={12} md={6}>
          <Paper style={styles.paper} zDepth={2}>
            <h2 style={styles.header}>Group Work</h2>
          </Paper>
        </Box>
      </Flex>
    </div>
  )
}

export default Home;
