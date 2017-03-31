import React, { Component } from 'react';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { grey900, red400 } from 'material-ui/styles/colors';

import NavBar from './NavBar';

import '../scss/main.scss';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#c5e2da',
    accent1Color: red400,
    textColor: grey900,
    alternateTextColor: '#FFFFFF',
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
