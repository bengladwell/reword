import React, { Component, PropTypes } from 'react';
import Paper from 'material-ui/lib/paper';

import styles from '../../css/components/word.css';

// these theme imports and the childContext method and static property are here
// to avoid a deprecation warning in React 0.13.3; TODO - attempt to remove in 0.14.0
import Theme from '../Theme';
import ThemeManager from 'material-ui/lib/styles/theme-manager';

export default class Word extends Component {
  getChildContext() {
    return {
      muiTheme: ThemeManager.getMuiTheme(Theme)
    };
  }

  render() {
    return (<Paper zDepth={2} className={styles.root}><span className={styles.text}>{this.props.word}</span></Paper>);
  }
}

Word.childContextTypes = {
  muiTheme: React.PropTypes.object
};

Word.propTypes = {
  word: PropTypes.string.isRequired
};
