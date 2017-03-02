/**
 * @file HTML generation for the Home page
 */

import React from 'react';
import { Box, Flex } from 'reflexbox';
import CanvasList from './CanvasList';
import CreateCanvas from './CreateCanvas';

const styles = {
  body: {
    textAlign: 'center',
  },
  header: {
    textAlign: 'center',
  },
  welcome: {
    fontSize: '3.5em',
    fontWeight: 500,
    marginBottom: 20,
  },
};

/**
 * Gives HTML for the home page after login.
 * @returns {HTML} The HTML of the home page.
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
          <CreateCanvas />
          </header>
      </Box>
      <Box col={12} sm={12}>
        <p>Pick up where you left off.</p>
      </Box>
      <div>
        <CanvasList />
      </div>
    </Flex>
  )
}

export default Home;
