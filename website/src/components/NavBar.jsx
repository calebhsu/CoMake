import React from 'react';
import { Link } from 'react-router';

import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';
import Down from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import FlatButton from 'material-ui/FlatButton';
import Home from 'material-ui/svg-icons/action/home';
import IconButton from 'material-ui/IconButton';
import ListItem from 'material-ui/List/ListItem';
import { white } from 'material-ui/styles/colors';

const styles = {
  btn: {
    height: 64,
  },
  dropdownIcon: {
    verticalAlign: 'middle',
  },
  user: {
    color: white,
    fontSize: 14,
    height: 50,
    letterSpacing: 1,
    marginTop: 5,
    textTransform: 'uppercase',
  },
  userElement: {
    margin: 0,
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
        <Link to="/profile">
          <FlatButton
            secondary={true}
            style={styles.btn}
          >
            <ListItem
              disabled={true}
              leftAvatar={
                <Avatar src="http://placekitten.com/95/95" />
              }
              style={styles.user}
            >
              <span>
                Vin Diesel <Down color={white} style={styles.dropdownIcon} />
              </span>
            </ListItem>
          </FlatButton>
        </Link>
      }
      iconStyleRight={styles.userElement}
      iconElementLeft={
        <Link to="/home">
          <IconButton><Home color={white} /></IconButton>
        </Link>
      }
    />
  );
}

export default NavBar;
