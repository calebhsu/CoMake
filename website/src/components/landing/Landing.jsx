import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Box, Flex } from 'reflexbox';

import LandingNavBar from './LandingNavBar';

import Brush from 'material-ui/svg-icons/image/brush';
import Group from 'material-ui/svg-icons/social/group';
import RaisedButton from 'material-ui/RaisedButton';
import Share from 'material-ui/svg-icons/editor/highlight';
import { black, grey700, red400 } from 'material-ui/styles/colors';

import { promptForLogin } from '../../helpers/LoginHelper'

import globalStyles from '../../scss/main.scss';
import headerImg from '../../img/landing-background.png';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#c5e2da',
    accent1Color: red400
  },
});


const styles = {
  about: {
    color: black,
    textAlign: 'center',
  },
  boxText: {
    color: black,
    textAlign: 'justify',
  },
  header: {
    background: 'url(' + headerImg + ') no-repeat center top scroll',
    backgroundSize: 'cover',
    marginTop: 0,
    paddingBottom: 100,
    textAlign: 'center'
  },
  icon: {
    fontSize: '4em',
    height: '1.6em',
    width: '1.5em',
  },
  loginBtn: {
    marginTop: '1em',
  },
  loginLabel: {
    fontSize: '1em',
    fontWeight: 500,
    letterSpacing: 1.5,
    padding: '1.8em 2em',
  },
  subtitle: {
    color: grey700,
    fontSize: '1.8em',
    marginTop: '-0.5em',
  },
  title: {
    color: black,
    fontSize: '5em',
    margin: 0,
    paddingTop: '2.2em',
  },
};

/**
 * Gives HTML for the Landing.
 * @returns {HTML}   The HTML of the landing page.
 */
function Landing() {
  return (
    <MuiThemeProvider muiTheme={muiTheme}>
      <div>
        <LandingNavBar />
        <div style={styles.header}>
          <h1 style={styles.title} className={globalStyles.title}>comake</h1>
          <p style={styles.subtitle} className={globalStyles.subtitle}>design 2D, export 3D</p>
          <RaisedButton
            label="Sign Up / Log In"
            labelStyle={styles.loginLabel}
            secondary={true}
            style={styles.loginBtn}
            onClick={promptForLogin}
          />
        </div>
        <Flex
          align="stretch"
          justify="space-around"
          px={5}
          py={5}
          style={styles.about}
          wrap
        >
          <Box col={3} sm={3}>
            <Brush style={styles.icon} color={black} />
            <h2>Design New Models</h2>
            <p style={styles.boxText}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
              quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat.
            </p>
          </Box>
          <Box col={3} sm={3}>
            <Group style={styles.icon} color={black} />
            <h2>Collaborate With Friends</h2>
            <p style={styles.boxText}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
              quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat.
            </p>
          </Box>
          <Box col={3} sm={3}>
            <Share style={styles.icon} color={black} />
            <h2>Share With Everyone</h2>
            <p style={styles.boxText}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
              quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat.
            </p>
          </Box>
        </Flex>
      </div>
    </MuiThemeProvider>
  );
}

export default Landing;
