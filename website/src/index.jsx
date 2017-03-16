import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { persistStore } from 'redux-persist';
import * as firebase from 'firebase';

import Routes from './routes'

import { initFirebase } from './helpers/FirebaseHelper';
import storeHelper from './redux/storeHelper'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// initialize firebase
initFirebase();

// construct redux store
const store = storeHelper.constructStore(true);

firebase.auth().onAuthStateChanged(() => {
  persistStore(store);
});

render(
  <AppContainer>
    <Provider store={store}>
      <Routes />
    </Provider>
  </AppContainer>,
  document.querySelector('#app')
);

if (module.hot) {
  module.hot.accept('./components/MainLayout.jsx', () => {
    render(
      <AppContainer>
        <Provider store={store}>
          <Routes />
        </Provider>
      </AppContainer>,
      document.querySelector('#app')
    );
  });
}
