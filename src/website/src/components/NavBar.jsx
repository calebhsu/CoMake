import React from 'react';

import AppBar from 'material-ui/AppBar';
import { HelloService } from '../services/HelloService';

/**
 * Gives HTML for the NavBar.
 * @return {HTML}   The HTML of the navigation bar.
 */
function NavBar() {
  HelloService.request();
  return <AppBar title="CoMake" />;
}

export default NavBar;
