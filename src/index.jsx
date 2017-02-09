import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Routes from './routes'

import { initFirebase } from './components/firebase-utils';
import storeHelper from './components/redux/storeHelper'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

initFirebase();

const store = storeHelper.constructStore();

render(<AppContainer>
  <Provider store={store}>
    <Routes />
  </Provider>
</AppContainer>, document.querySelector('#app'));

if (module.hot) {
  module.hot.accept('./components/app.jsx', () => {
    render(
      <AppContainer>
        <Provider store={store}>
          <Routes />
        </Provider>
      </AppContainer>
    )
  });
}
