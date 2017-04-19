/**
 * @file HTML generation for the dashboard page on login.
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
function Dashboard() {
  return (
    <div style={styles.body}>
      <SideBar />
      <CanvasList />
    </div>
  )
}

export default Dashboard;
