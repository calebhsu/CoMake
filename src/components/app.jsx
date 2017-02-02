import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Home from './Home';
import {manageLogin} from '../util/login.js'

import '../scss/main.scss';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: 'rgb(80, 17, 61)',
  },
});

/**
 * Assembles and returns the HTML for the App.
 * @return {HTML}   The HTML of the application.
 */
function App() {

  return (
    <MuiThemeProvider muiTheme={muiTheme}>
      <div>
        <Home />
      </div>
    </MuiThemeProvider>
  );
}

/**
 * Checks if user is logged in
 
 */
function requireAuth(nextState, replaceState) {
  if (!auth.loggedIn())
    replaceState({ nextPathname: nextState.location.pathname }, '/login')
}

export default App;
