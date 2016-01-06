import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import { ReduxRouter } from 'redux-router';
import { IndexRoute, Route } from 'react-router';

import App from './App';
import CreateHandler from './CreateHandler';
import ViewHandler from './ViewHandler';
import SettingsHandler from './SettingsHandler';

// this component just sets up the routing rules

export default class Root extends Component {
  render() {
    return (
      <Provider store={this.props.store}>
        <ReduxRouter>
          <Route path="/" component={App}>
            <IndexRoute component={ViewHandler} />
            <Route path="create" component={CreateHandler} />
            <Route path="settings" component={SettingsHandler} />
          </Route>
        </ReduxRouter>
      </Provider>
    );
  }
}

Root.proptypes = {
  store: PropTypes.object.isRequired
};
