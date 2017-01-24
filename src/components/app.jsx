import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import { green100, green500, green700 } from 'material-ui/styles/colors';

import React from 'react';
import NavBar from './NavBar';
import {manageLogin} from '../util/login.js'

import '../scss/main.scss';

const styles = {
  container: {
    marginTop: '15px',
    textAlign: 'center',
  },
};

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: green500,
    primary2Color: green700,
    primary3Color: green100,
  },
});

/**
 * Assembles and returns the HTML for the App.
 * @return {HTML}   The HTML of the application.
 */
function App() {

manageLogin(this.getAvailableGrids);
  return (
    <MuiThemeProvider muiTheme={muiTheme}>
      <div>
        <NavBar />
        <div style={styles.container}>
          <h1>It Works!</h1>
          <p>This React project works including local CSS styles.</p>
          <RaisedButton label="Enjoy" />
        </div>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
