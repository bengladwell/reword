import React, { Component, PropTypes } from 'react';
import Paper from 'material-ui/lib/paper';

import styles from '../../css/components/word.css';

export default class Word extends Component {
  render() {
    const { text } = this.props;
    return (<Paper zDepth={2} className={styles.root}><span className={styles.text}>{text}</span></Paper>);
  }
}

Word.propTypes = {
  text: PropTypes.string.isRequired
};
