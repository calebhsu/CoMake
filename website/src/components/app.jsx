import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import { green100, green500, green700 } from 'material-ui/styles/colors';
import * as firebase from 'firebase';

import React from 'react';
import NavBar from './NavBar';
import { HelloService } from '../services/HelloService';

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
  return (
    <MuiThemeProvider muiTheme={muiTheme}>
      <div>
        <NavBar />
        <div style={styles.container}>
          <h1>It Works!</h1>
          <p>This React project works including local CSS styles.</p>
          <h5 id="output_saving_hello_service"></h5>
          <h5 id="output_saving_hello"></h5>
          <h5 id="hello_service"></h5>
          <RaisedButton
            label="Enjoy"
            onClick={() => {
              document.getElementById('output_saving_hello_service').textContent = '';
              document.getElementById('output_saving_hello').textContent = '';

              HelloService.request();

              firebase.database().ref('/hello_service').once('value', (dataSnap) => {
                document.getElementById('hello_service').textContent = dataSnap.val();
              });

              firebase.database().ref('/hello_service').set(Math.random()).catch(() => {
                document.getElementById('output_saving_hello_service').textContent = 'saving to hello_service ref was not allowed.';
              });

              firebase.database().ref('/hello').set(Math.random());

              document.getElementById('output_saving_hello').textContent = 'saving to hello ref was allowed.';
            }}
          />
        </div>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
