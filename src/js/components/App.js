import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import AppBar from 'material-ui/lib/app-bar';
import FontIcon from 'material-ui/lib/font-icon';
import IconButton from 'material-ui/lib/icon-button';
import ToolbarSeparator from 'material-ui/lib/toolbar/toolbar-separator';
import Avatar from 'material-ui/lib/avatar';
import Theme from '../Theme';
import Firebase from 'firebase';

import styles from '../../css/components/app.css';

import ThemeManager from 'material-ui/lib/styles/theme-manager';
import Colors from 'material-ui/lib/styles/colors';

const firebase = new Firebase('https://reword.firebaseio.com');

class App extends Component {
  getChildContext() {
    var theme = ThemeManager.getMuiTheme(Theme);
    theme.appBar.textColor = Colors.white;
    return {
      muiTheme: theme
    };
  }

  render() {
    const theme = ThemeManager.getMuiTheme(Theme),
      { user } = this.props,
      settingsLink = this.props.location.pathname === "/settings" ?
          <Link to="/"><FontIcon className="material-icons" color={Colors.white}>arrow_back</FontIcon></Link>
        : <Link to="/settings"><FontIcon className="material-icons" color={Colors.white}>settings</FontIcon></Link>,
      elementRight = (
        <div>
          { user ?
              <span>{settingsLink}<ToolbarSeparator style={{top: '6px', marginLeft: '4px'}}/></span>
            : '' }

          { user ?
              <span className={styles.label}>
                <Avatar src={user.image} style={{verticalAlign: "middle", marginRight: '4px'}}/>
                {user.name}
              </span>

            : <span className={styles.label}>Login
              <IconButton
                tooltip="Login with GitHub"
                tooltipPosition="bottom-left"
                style={{padding: '0px 8px', width: 'inherit'}}
                onClick={() => {
                  firebase.authWithOAuthRedirect("github", (err) => {
                    if (err) {
                      firebase.unauth();
                    }
                  });
                }}
              >
                <FontIcon className="icomoon-github" color={Colors.white} />
              </IconButton>
              </span> }
        </div>
      );

    return (
      <div className="app">
        <AppBar
          title="reword"
          showMenuIconButton={false}
          iconStyleRight={{marginTop: 0, marginRight: 0, lineHeight: theme.appBar.height + 'px', fontSize: 24}}
          iconElementRight={elementRight}
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
  user: PropTypes.object,
  children: PropTypes.node
};

export default connect((state) => {
  return {
    user: state.user
  };
})(App);
