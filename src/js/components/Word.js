import React, { Component, PropTypes } from 'react';
import Paper from 'material-ui/lib/paper';

import styles from '../../css/components/word.css';

export default class Word extends Component {
  render() {
    const { text, draggable } = this.props;
    return (<Paper zDepth={2} className={draggable ? styles.draggable : styles.root}><span className={styles.text}>{text}</span></Paper>);
  }
}

Word.propTypes = {
  text: PropTypes.string.isRequired,
  draggable: PropTypes.bool
};
