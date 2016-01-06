import React, { Component, PropTypes } from 'react';
import Paper from 'material-ui/lib/paper';

import styles from './Word.css';

export default class Word extends Component {
  render() {
    const { text } = this.props,
      className = this.props.animated ? styles.animated : styles.root;
    return (
      <div className={className}>
        <Paper zDepth={2} className={styles.paper}>
          <span className={styles.text}>{text}</span>
        </Paper>
      </div>
    );
  }
}

Word.propTypes = {
  text: PropTypes.string.isRequired
};
