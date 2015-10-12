import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import AppBar from 'material-ui/lib/app-bar';
import FontIcon from 'material-ui/lib/font-icon';
import Theme from '../Theme';

import ThemeManager from 'material-ui/lib/styles/theme-manager';
import Colors from 'material-ui/lib/styles/colors';

export default class App extends Component {
  getChildContext() {
    var theme = ThemeManager.getMuiTheme(Theme);
    theme.appBar.textColor = Colors.white;
    return {
      muiTheme: theme
    };
  }

  render() {
    var theme = ThemeManager.getMuiTheme(Theme);
    return (
      <div className="app">
        <AppBar
          title="reword"
          showMenuIconButton={false}
          iconStyleRight={{marginTop: 0, marginRight: 0, lineHeight: theme.appBar.height + 'px', fontSize: 24}}
          iconElementRight={
            this.props.location.pathname === "/settings" ?
                <Link to="/"><FontIcon className="material-icons" color={Colors.white}>arrow_back</FontIcon></Link>
              : <Link to="/settings"><FontIcon className="material-icons" color={Colors.white}>settings</FontIcon></Link>
          }
        />
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
