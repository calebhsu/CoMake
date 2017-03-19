/**
 * @file Progress indicator for new canvas creation.
 */

import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

import * as globalStyles from '../../scss/main.scss';

const styles = {
  circProg: {
    display: 'block'
  },
  container: {
    position: 'relative',
  },
  loadingText: {
    color: '#409c93',
    fontWeight: 600,
    left: 22,
    letterSpacing: 1,
    position: 'absolute',
    textTransform: 'uppercase',
    top: 48,
    zIndex: 20,
  },
  loadingWrapper: {
    left: '50%',
    position: 'fixed',
    top: '45vh',
    transform: 'translate(-50%, -50%)',
    zIndex: 15,
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
  }
}

/**
 * Gives HTML for loading progress indicator.
 * @returns {HTML}   The HTML of the loading progress indicator.
 */
const LoadingIndicator = () => (
  <div style={styles.container}>
    <div style={styles.pageFade} />
    <div style={styles.loadingWrapper}>
      <span
        className={globalStyles.blinkAnimation}
        style={styles.loadingText}
      >
        Loading
      </span>
      <CircularProgress
        color="#72cfad"
        size={120}
        style={styles.circProg}
        thickness={5}
      />
    </div>
  </div>
);

export default LoadingIndicator;
