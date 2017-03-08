import React from 'react';
import { IndexRoute, Router, Route, hashHistory } from 'react-router';

import Canvas from './components/canvas/Canvas';
import Home from './components/home/Home';
import Landing from './components/landing/Landing';
import Profile from './components/profile/Profile';
import MainLayout from './components/MainLayout';

/**
 * Defines routes for all application components.
 * @returns {HTML} The application components and corresponding paths.
 */
function Routes() {
  return (
    <Router history={hashHistory}>
      <Route path="/login" component={Landing} />
      <Route path="/" component={MainLayout}>
        <IndexRoute component={Home} />
        <Route path="/home" component={Home} />
        <Route path="/canvas" component={Canvas} />
        <Route path="/profile" component={Profile} />
      </Route>
    </Router>
  );
}

export default Routes;
