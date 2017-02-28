import React, { Component } from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NavBar from './NavBar';

import '../scss/main.scss';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#2c9a8a',
    primary2Color: '#D8F1A0',
    accent1Color: '#F68E5F',
    accent2Color: '#F7C59F',
    accent3Color: '#EDAE49',
    textColor: '#4C5454',
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
