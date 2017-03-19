import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

import * as globalStyles from '../../scss/main.scss';

const styles = {
  circProg: {
    display: 'block'
  },
  loadingText: {
    color: '#409c93',
    fontWeight: 600,
    left: 22,
    letterSpacing: 1,
    position: 'absolute',
    textTransform: 'uppercase',
    top: 48,
    zIndex: 10,
  },
  loadingWrapper: {
    margin: '0 auto',
    position: 'relative',
  }
}
const LoadingIndicator = () => (
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
);

export default LoadingIndicator;
