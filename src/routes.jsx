import React from 'react';
import { Router, Route, hashHistory } from 'react-router';

import Home from './components/home/Home';
import Landing from './components/landing/Landing';
import MainLayout from './components/MainLayout';

/**
 * Defines routes for all application components.
 * @return {HTML} The application components and corresponding paths.
 */
function Routes() {
  return (
    <Router history={hashHistory}>
      <Route path="/login" component={Landing} />
      <Route path="/" component={MainLayout}>
        <Route path="/home" component={Home} />
      </Route>
    </Router>
  );
}

export default Routes;