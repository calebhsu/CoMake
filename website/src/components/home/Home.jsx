/**
 * @file HTML generation for the Home page
 */

import React from 'react';
import { Flex } from 'reflexbox';

import CanvasList from './CanvasList';

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
      <div>
        <CanvasList />
      </div>
    </Flex>
  )
}

export default Home;
