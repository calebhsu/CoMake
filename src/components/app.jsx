import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { orange100, orange700 } from 'material-ui/styles/colors';

import React from 'react';
import Home from './Home';

import '../scss/main.scss';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: 'rgb(80, 17, 61)',
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
        <Home />
      </div>
    </MuiThemeProvider>
  );
}

export default App;
