import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { getStoredState, persistStore, purgeStoredState } from 'redux-persist';
import { asyncLocalStorage } from 'redux-persist/storages';

import Routes from './routes'

import { initFirebase } from './helpers/FirebaseHelper';
import * as RC from './redux/reducers/ReducerConstants';
import storeHelper from './redux/storeHelper'

const PERSIST_STORE = true;
const persistConfig = { storage: asyncLocalStorage, whitelist: [RC.LOGIN_REDUCER] };

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// initialize firebase
initFirebase();

getStoredState(persistConfig, (err, state) => {
  // construct redux store
  const store = storeHelper.constructStore(PERSIST_STORE, state);
  let persisted = false;

  store.subscribe(() => {
    const currentState = store.getState();
    if(currentState[RC.LOGIN_REDUCER][RC.USER_INFO][RC.USER_ID] && !persisted) {
      persistStore(store, persistConfig);
      persisted = true;
    }
    else if(!(currentState[RC.LOGIN_REDUCER][RC.USER_INFO][RC.USER_ID]) && persisted) {
      purgeStoredState(persistConfig);
      persisted = false;
    }
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
});


