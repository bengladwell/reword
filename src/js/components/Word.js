import React, { Component, PropTypes } from 'react';
import Paper from 'material-ui/lib/paper';

import styles from '../../css/components/word.css';

export default class Word extends Component {
  render() {
    return (<Paper zDepth={2} className={styles.top}><span className={styles.text}>{this.props.word}</span></Paper>);
  }
}

Word.propTypes = {
  word: PropTypes.string.isRequired
};
