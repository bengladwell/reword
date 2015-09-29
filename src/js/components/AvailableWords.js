import React, { Component } from 'react';
import WordGroup from './WordGroup';

import styles from '../../css/components/available-words.css';

export default class AvailableWords extends Component {
  render() {
    var words = this.props.words || [];

    return (
      <div className={styles.top}>
        <div className={styles.header}>Available Words</div>
        <WordGroup words={words} />
      </div>
    );
  }
}
