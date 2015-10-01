import React, { Component } from 'react';
import AppBar from 'material-ui/lib/app-bar';
import AvailableWords from './AvailableWords';
import Theme from '../Theme';

import ThemeManager from 'material-ui/lib/styles/theme-manager';
import Colors from 'material-ui/lib/styles/colors';

const words = [
  {id: 0, text: 'hello'},
  {id: 1, text: 'here'},
  {id: 2, text: 'are'},
  {id: 3, text: 'some'},
  {id: 4, text: 'words'}
];

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
        <AppBar title="quip" showMenuIconButton={false}/>
        <AvailableWords words={words} />
      </div>
    );
  }
}

App.childContextTypes = {
  muiTheme: React.PropTypes.object
};
