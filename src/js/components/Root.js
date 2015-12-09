import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import { ReduxRouter } from 'redux-router';
import { IndexRoute, Route } from 'react-router';

import App from './App';
import CreatePhrase from './CreatePhrase';
import ViewPhrase from './ViewPhrase';
import Settings from './Settings';

// this component just sets up the routing rules

export default class Root extends Component {
  render() {
    return (
      <Provider store={this.props.store}>
        <ReduxRouter>
          <Route path="/" component={App}>
            <IndexRoute component={ViewPhrase} />
            <Route path="create" component={CreatePhrase} />
            <Route path="settings" component={Settings} />
          </Route>
        </ReduxRouter>
      </Provider>
    );
  }
}

Root.proptypes = {
  store: PropTypes.object.isRequired
};
