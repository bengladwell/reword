import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import { ReduxRouter } from 'redux-router';
import { IndexRoute, Route } from 'react-router';

import App from './App';
import Spaces from './Spaces';
import Settings from './Settings';

export default class Root extends Component {
  render() {
    return (
      <Provider store={this.props.store}>
        <ReduxRouter>
          <Route path="/" component={App}>
            <IndexRoute component={Spaces} />
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
