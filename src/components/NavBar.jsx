import React from 'react';
import { Link } from 'react-router';

import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import { white } from 'material-ui/styles/colors';

const styles = {
  btnLabel: {
    color: white,
  },
};

/**
 * Gives HTML for the NavBar.
 * @return {HTML}   The HTML of the navigation bar.
 */
function NavBar() {
  return (
    <AppBar
      title="CoMake"
      iconElementRight={
        <Link to="/">
          <FlatButton
            label="Log Out"
            labelStyle={styles.btnLabel}
          />
        </Link>
      }
      showMenuIconButton={false}
    />
  );
}

export default NavBar;
