import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import injectTapEventPlugin from 'react-tap-event-plugin';

import App from './components/app.jsx';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

render( <AppContainer><App/></AppContainer>, document.querySelector("#app"));

if (module.hot) {
  module.hot.accept('./components/app.jsx', () => {
    const App = require('./components/app.jsx').default;
    render(
      <AppContainer>
        <App/>
      </AppContainer>,
      document.querySelector("#app")
    );
  });
}
