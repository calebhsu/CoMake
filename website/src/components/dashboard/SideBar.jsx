/**
 * @file HTML generation for the Home page side bar
 */

import React from 'react';
import { Box } from 'reflexbox';

import CreateCanvas from './CreateCanvas';

import globalStyles from '../../scss/main.scss';

const styles = {
  sidebar: {
    backgroundColor: '#EFEFEF',
    height: '100%',
    left: 0,
    minWidth: 250,
    paddingTop: 80,
    position: 'fixed',
    textAlign: 'center',
    top: 0,
    zIndex: 10,
  },
};

/**
 * Gives HTML for the home page side bar.
 * @returns {HTML} The HTML of the side bar.
 */
function SideBar() {
  return (
    <Box
      col={2}
      mr={2}
      style={styles.sidebar}
    >
      <h2 className={globalStyles.subtitle}>Welcome!</h2>
      <CreateCanvas />
    </Box>
  )
}

export default SideBar;
