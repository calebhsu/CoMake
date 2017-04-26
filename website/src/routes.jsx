import React from 'react';
import { IndexRoute, Router, Route, hashHistory } from 'react-router';

import Canvas from './components/canvas/Canvas';
import Home from './components/Home';
import MainLayout from './components/MainLayout';
import PageNotFound from './components/PageNotFound';

/**
 * Defines routes for all application components.
 * @returns {HTML} The application components and corresponding paths.
 */
function Routes() {
  return (
    <Router history={hashHistory}>
      <Route path="/" component={MainLayout}>
        <IndexRoute component={Home} />
        <Route path="/canvas/:canvasId" component={Canvas} />
        <Route path='*' component={PageNotFound} />
      </Route>
    </Router>
  );
}

export default Routes;
