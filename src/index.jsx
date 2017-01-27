import * as firebase from 'firebase';
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { createStore, Provider } from 'redux';

import App from './components/app';
import reducers from './components/redux/reducers';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// start code from console.firebase.google.com
const config = {
  apiKey: 'AIzaSyBouGOzw_GYXTl9_hkHhL2WZYvh1NHoQM0',
  authDomain: 'comake-95cb7.firebaseapp.com',
  databaseURL: 'https://comake-95cb7.firebaseio.com',
  storageBucket: 'comake-95cb7.appspot.com',
  messagingSenderId: '578562241026',
};
firebase.initializeApp(config);
// end sourced code


console.log(reducers);
const store = createStore(reducers);

render(<AppContainer>
  <Provider store={store}>
    <App />
  </Provider>
</AppContainer>, document.querySelector('#app'));

if (module.hot) {
  module.hot.accept('./components/app.jsx', () => {
    render(
      <AppContainer>
        <Provider store={store}>
          <App />
        </Provider>
      </AppContainer>,
      document.querySelector('#app'),
    );
  });
}
