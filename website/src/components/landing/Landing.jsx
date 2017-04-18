import React from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import { grey700 } from 'material-ui/styles/colors';

import LandingContent from './LandingContent';

import { promptForLogin } from '../../helpers/LoginHelper'

import globalStyles from '../../scss/main.scss';
import headerImg from '../../img/landing-background.png';

const styles = {
  header: {
    background: 'url(' + headerImg + ') no-repeat center top scroll',
    backgroundSize: 'cover',
    marginTop: 0,
    paddingBottom: 100,
    textAlign: 'center'
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
    color: '#e74c49',
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
      <div>
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
        <LandingContent />
      </div>
  );
}

export default Landing;
