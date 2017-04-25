/**
 * @file Page not found component.
 */

import React from 'react';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
  container: {
    position: 'relative',
  },
  errorText: {
    color: '#e74c49',
    fontWeight: 600,
    letterSpacing: 1,
    textTransform: 'uppercase',
    zIndex: 20,
  },
  errorWrapper: {
    left: '50%',
    position: 'fixed',
    textAlign: 'center',
    top: '45vh',
    transform: 'translate(-50%, -50%)',
    zIndex: 15,
    width: '300px',
  },
  pageFade: {
    background: '#FFFFFF',
    content: '',
    height: '100%',
    left: 0,
    opacity: 0.85,
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: 10,
  },
}

const PAGE_NOT_FOUND_TEXT = '404: Page not Found'
const GO_HOME_BUTTON = 'Go Home'

/**
 * Gives HTML for displaying canvas error.
 * @returns {HTML}   The HTML of the loading progress indicator.
 */
const PageNotFound = () => (
  <div style={styles.container}>
    <div style={styles.pageFade} />
    <div style={styles.errorWrapper}>
      <p style={styles.errorText}>
        {PAGE_NOT_FOUND_TEXT}
      </p>
      <Link to="/home">
        <RaisedButton
          backgroundColor={'#e74c49'}
          labelColor={'#ffffff'}
          label={GO_HOME_BUTTON}
        />
      </Link>
    </div>
  </div>
);

export default PageNotFound;
