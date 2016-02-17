import React, { Component } from 'react';
import { IndexRoute, Router, Route, browserHistory } from 'react-router';

import App from '../components/App/App';
import CreateHandler from '../handlers/CreateHandler';
import ViewHandler from '../handlers/ViewHandler';
import SettingsHandler from '../handlers/SettingsHandler';

// this component just sets up the routing rules

export default class Routes extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={ViewHandler} />
          <Route path="create" component={CreateHandler} />
          <Route path="settings" component={SettingsHandler} />
        </Route>
      </Router>
    );
  }
}
