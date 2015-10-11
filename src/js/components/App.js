import React, { Component, PropTypes } from 'react';
import AppBar from 'material-ui/lib/app-bar';
import Theme from '../Theme';

import ThemeManager from 'material-ui/lib/styles/theme-manager';
import Colors from 'material-ui/lib/styles/colors';

export default class App extends Component {
  getChildContext() {
    var theme = ThemeManager.getMuiTheme(Theme);
    theme.appBar.textColor = Colors.lightBlack;
    return {
      muiTheme: theme
    };
  }

  render() {
    return (
      <div className="app">
        <AppBar title="reword" showMenuIconButton={false}/>
        {this.props.children}
      </div>
    );
  }
}

App.childContextTypes = {
  muiTheme: React.PropTypes.object
};

App.propTypes = {
  children: PropTypes.node
};
