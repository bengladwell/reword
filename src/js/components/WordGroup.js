import React, { Component, PropTypes } from 'react';
import Word from './Word';

import styles from '../../css/components/word-group.css';

export default class WordGroup extends Component {
  render() {
    var words = this.props.words || [];

    return (
      <div className={styles.top}>
        {words.map(function (word) {
          return <Word key={word.id} word={word.text} />;
        })}
      </div>
    );
  }
}

WordGroup.propTypes = {
  words: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired).isRequired
};
