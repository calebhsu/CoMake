import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import BoardView from './board_view/BoardView';
import Home from './Home';

import '../scss/main.scss';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: 'rgb(80, 17, 61)',
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
        <BoardView />
      </div>
    </MuiThemeProvider>
  );
}

export default App;
