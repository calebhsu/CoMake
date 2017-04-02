import React, { Component } from 'react';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { white, grey900 } from 'material-ui/styles/colors';

import NavBar from './NavBar';

import '../scss/main.scss';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: white,
    accent1Color: '#e74c49',
    textColor: '#e74c49',
    alternateTextColor: white,
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
