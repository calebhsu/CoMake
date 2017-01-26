import React from 'react';

import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

/**
 * Gives HTML for the NavBar.
 * @return {HTML}   The HTML of the navigation bar.
 */
function NavBar() {
  return (
    <AppBar
      title="CoMake"
      iconElementRight={<FlatButton label="Login" />}
      showMenuIconButton={false}
    />
  );
}

export default NavBar;
