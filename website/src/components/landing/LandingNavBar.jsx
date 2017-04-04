import React from 'react';

import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

const styles = {
  navBar: {
    height: 54,
  },
  navBtn: {
    marginTop: 8,
  },
  navBtnLabel: {
    fontWeight: 600,
    letterSpacing: 1.5,
  },
};

/**
 * Gives HTML for the Landing nav bar.
 * @returns {HTML}   The HTML of the landing page nav bar.
 */
function LandingNavBar() {
  return (
    <AppBar showMenuIconButton={false} style={styles.navBar}>
      <FlatButton
        label="About"
        labelStyle={styles.navBtnLabel}
        style={styles.navBtn}
      />
      <FlatButton
        label="User Guide"
        labelStyle={styles.navBtnLabel}
        style={styles.navBtn}
      />
      <FlatButton
        href="https://craftml.io/"
        label="CraftML"
        labelStyle={styles.navBtnLabel}
        style={styles.navBtn}
      />
    </AppBar>
  );
}

export default LandingNavBar;
