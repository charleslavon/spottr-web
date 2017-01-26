import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './components/App';
import WorkoutsContainer from './containers/WorkoutsContainer';
import StartupContainer from './containers/StartupContainer';
import NotFoundPage from './components/NotFoundPage.js';

export default (
  <Router history={browserHistory}>
    <Route path="/" component={App} >
      <IndexRoute component={StartupContainer}/>
      <Route path="wods" component={WorkoutsContainer}/>
      <Route path="*" component={NotFoundPage}/>
    </Route>
  </Router>
);
