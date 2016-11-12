import React, {Component} from 'react';
import NavBar from './NavBar.jsx';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RaisedButton from 'material-ui/RaisedButton';
import {green100, green500, green700} from 'material-ui/styles/colors';

import '../scss/main.scss';

const styles = {
  container: {
    marginTop: '15px',
    textAlign: 'center'
  }
};

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: green500,
    primary2Color: green700,
    primary3Color: green100,
  },
});

export default class App extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <NavBar />
          <div style={styles.container}>
            <h1>It Works!</h1>
            <p>This React project works including local CSS styles.</p>
            <RaisedButton label="Enjoy"/>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}
