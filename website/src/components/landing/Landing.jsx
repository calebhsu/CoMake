import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Box, Flex } from 'reflexbox';

import Brush from 'material-ui/svg-icons/image/brush';
import FlatButton from 'material-ui/FlatButton';
import Group from 'material-ui/svg-icons/social/group';
import Share from 'material-ui/svg-icons/editor/highlight';
import { white } from 'material-ui/styles/colors';

import { promptForLogin } from '../../helpers/LoginHelper'

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#1f786a',
  },
});

const styles = {
  about: {
    backgroundColor: '#1f786a',
    color: white,
    textAlign: 'center',
  },
  boxText: {
    color: white,
    textAlign: 'justify',
  },
  header: {
    color: white,
  },
  icon: {
    fontSize: '4em',
    height: '1.6em',
    width: '1.5em',
  },
  loginBtn: {
    border: '1px solid rgba(255, 255, 255, 0.75)',
    borderRadius: 10,
    color: white,
    height: '2.6em',
    marginTop: '1em',
  },
  loginLabel: {
    fontSize: '1.4em',
    padding: '1.4em 2em',
  },
};

/**
 * Gives HTML for the Landing.
 * @returns {HTML}   The HTML of the landing page.
 */
function Landing() {
  return (
    <MuiThemeProvider muiTheme={muiTheme}>
      <Flex
        align="stretch"
        justify="space-around"
        px={5}
        py={2}
        style={styles.about}
        wrap
      >
        <Box col={12} sm={12} mt={5} mb={5}>
          <h1 style={styles.header}>CoMake</h1>
          <FlatButton
            label="Login"
            labelStyle={styles.loginLabel}
            style={styles.loginBtn}
            onClick={promptForLogin}
          />
        </Box>
        <Box col={3} sm={3}>
          <Brush style={styles.icon} color={white} />
          <h2 style={styles.header}>Design New Models</h2>
          <p style={styles.boxText}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat.
          </p>
        </Box>
        <Box col={3} sm={3}>
          <Group style={styles.icon} color={white} />
          <h2 style={styles.header}>Collaborate With Friends</h2>
          <p style={styles.boxText}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat.
          </p>
        </Box>
        <Box col={3} sm={3}>
          <Share style={styles.icon} color={white} />
          <h2 style={styles.header}>Share With Everyone</h2>
          <p style={styles.boxText}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat.
          </p>
        </Box>
      </Flex>
    </MuiThemeProvider>
  );
}

export default Landing;
