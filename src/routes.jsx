import React from 'react';
import { Router, Route, hashHistory } from 'react-router';

import Landing from './components/landing/Landing';
import MainLayout from './components/MainLayout';

/**
 * Defines routes for all application components.
 * @return {HTML} The application components and corresponding paths.
 */
function Routes() {
  return (
    <Router history={hashHistory}>
      <Route path="/" component={Landing} />
      <Route path="/home" component={MainLayout}>
        
      </Route>
    </Router>
  );
}

export default Routes;
