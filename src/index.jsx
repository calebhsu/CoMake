import React from 'react';
import { Router, Route, hashHistory } from 'react-router';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Landing from './components/Landing';
import Home from './components/App';

function Index() {
  return (
    <Router history={hashHistory}>
      <Route path="/" component={Landing} />
      <Route path="/home" component={Home} />
    </Router>
  );
}

export default Index;

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

render(<Index />, document.querySelector('#app'));

// NOTE: figure out how to get hot loader working with react-router later
// if (module.hot) {
//   module.hot.accept('./components/app.jsx', () => {
//     render(
//       <AppContainer>
//         <App />
//       </AppContainer>,
//       document.querySelector('#app'),
//     );
//   });
// }
