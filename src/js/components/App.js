import React, { Component } from 'react';
import AppBar from 'material-ui/lib/app-bar';
import AvailableWords from './AvailableWords';
import Theme from '../Theme';

import ThemeManager from 'material-ui/lib/styles/theme-manager';

const words = [
  {id: 0, text: 'hello'},
  {id: 1, text: 'here'},
  {id: 2, text: 'are'},
  {id: 3, text: 'some'},
  {id: 4, text: 'words'}
];

class App extends Component {
  getChildContext() {
    return {
      muiTheme: ThemeManager.getMuiTheme(Theme)
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

export default App;
