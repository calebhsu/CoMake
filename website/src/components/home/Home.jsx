/**
 * @file HTML generation for the Home page
 */

import React from 'react';

import CanvasList from './CanvasList';
import SideBar from './SideBar';

const styles = {
  body: {
    paddingTop: 35,
    textAlign: 'center',
  },
};

/**
 * Gives HTML for the home page after login.
 * @returns {HTML} The HTML of the home page.
 */
function Home() {
  return (
    <div style={styles.body}>
      <SideBar />
      <CanvasList />
    </div>
  )
}

export default Home;
