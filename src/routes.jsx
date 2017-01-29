import React from 'react';
import { Router, Route, hashHistory } from 'react-router';

import App from './components/app';
import Landing from './components/Landing';

/**
 * Defines routes for all application components.
 * @return {HTML} The application components and corresponding paths.
 */
function Routes() {
  return (
    <Router history={hashHistory}>
      <Route path="/" component={Landing} />
      <Route path="/home" component={App} />
    </Router>
  );
}

export default Routes;
