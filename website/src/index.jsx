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
const userPersistConfig = { storage: asyncLocalStorage, whitelist: [RC.LOGIN_REDUCER] };
const canvasPersistConfig = { storage: asyncLocalStorage, whitelist: [RC.CANVAS_REDUCER] };
const allPersistConfig = { storage: asyncLocalStorage, whitelist: [RC.LOGIN_REDUCER, RC.CANVAS_REDUCER] };

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// initialize firebase
initFirebase();

getStoredState(allPersistConfig, (err, state) => {
  // construct redux store
  const store = storeHelper.constructStore(PERSIST_STORE, state);
  let userPersisted = false;
  let currentCanvas = '';

  store.subscribe(() => {
    const currentState = store.getState();
    if(currentState[RC.LOGIN_REDUCER][RC.USER_INFO][RC.USER_ID] && !userPersisted) {
      persistStore(store, userPersistConfig);
      userPersisted = true;
    }
    else if(!(currentState[RC.LOGIN_REDUCER][RC.USER_INFO][RC.USER_ID]) && userPersisted) {
      purgeStoredState(allPersistConfig);
      userPersisted = false;
    }

    if(currentState[RC.CANVAS_REDUCER][RC.CURRENT_CANVAS]
      && currentState[RC.CANVAS_REDUCER][RC.CURRENT_CANVAS] !== currentCanvas) {
      persistStore(store, canvasPersistConfig);
      currentCanvas = currentState[RC.CANVAS_REDUCER][RC.CURRENT_CANVAS];
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


