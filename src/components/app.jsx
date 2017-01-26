import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { orange100, orange700, orange800 } from 'material-ui/styles/colors';

import React from 'react';
import Landing from './Landing';

import '../scss/main.scss';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: orange800,
    primary2Color: orange700,
    primary3Color: orange100,
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
        <Landing />
      </div>
    </MuiThemeProvider>
  );
}

export default App;
