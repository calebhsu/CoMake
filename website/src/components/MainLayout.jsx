import React, { Component } from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NavBar from './NavBar';

import '../scss/main.scss';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#1f786a',
    primary2Color: '#49937f',
    accent1Color: '#c39f32',
    secondaryTextColor: '#FFFFFF',
  },
});

/**
 * Creates the main layout for pages that require login.
 * @class MainLayout
 */
class MainLayout extends Component {
  /**
   * @method MainLayout#render
   * @return {HTML} Rendered layout
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
