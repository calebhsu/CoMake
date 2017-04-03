import React, { Component } from 'react';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { white, grey900, grey700 } from 'material-ui/styles/colors';

import NavBar from './NavBar';

import '../scss/main.scss';

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: '#e74c49',
    alternateTextColor: grey900,
    disabledColor: grey700,
    primary1Color: white,
    primary2Color: '#a7d2cb',
    primary3Color: white,
    textColor: '#e74c49',
  },
  menuItem: {
    hoverColor: '#f7f7f7',
  },
  raisedButton: {
    secondaryTextColor: white,
  },
  slider: {
    handleColorZero: '#e74c49',
    selectionColor: '#42aeb5',
    trackColor: '#a7d2cb',
  },
  snackbar: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    textColor: white,
  },
  textField: {
    focusColor: '#42aeb5',
    textColor: grey900,
  },
});

/**
 * Creates the main layout for pages that require login.
 * @class MainLayout
 */
class MainLayout extends Component {
  /**
   * @method MainLayout#render
   * @returns {HTML} Rendered layout
   */
  render() {
    return (
      <MuiThemeProvider
       muiTheme={muiTheme}
      >
        <div>
           <NavBar />
           {this.props.children}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default MainLayout;
