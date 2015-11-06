import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Sortable from 'sortablejs';

import styles from '../../css/components/spaces.css';
import Word from './Word';

class Spaces extends Component {
  render() {
    // injected by connect()
    //const { dispatch, available, phrase } = this.props;
    const { available, phrase } = this.props;
    return (
      <div className={styles.root}>
        <div ref="available" className={styles.wordGroup}>
          {available.map(function (word) {
            return <Word key={word.id} word={word.text} />;
          })}
        </div>
        <div ref="phrase" className={styles.phrase}>
          {phrase.map(function (word) {
            return <Word key={word.id} word={word.text} />;
          })}
        </div>
      </div>
    );
  }

  /*onMoveWord(word, space) {
    this.props.dispatch(moveWord(word, space))
  }*/

  componentDidMount() {
    this.sortable = {
      available: new Sortable(this.refs.available, {
        group: 'spaces',
        animation: 300
      }),
      phrase: new Sortable(this.refs.phrase, {
        group: 'spaces',
        animation: 300
      })
    };
  }

  componentWillUnmount() {
    this.sortable.available.destroy();
    this.sortable.phrase.destroy();
    this.sortable = null;
  }
}

Spaces.propTypes = {
  available: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired).isRequired,
  phrase: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired).isRequired
};

function select(state) {
  let lookupWord = function (id) {
    let word = state.words.index.find(function (w) {
      return w.id === id;
    });
    return word;
  };
  return {
    available: state.words.available.map(lookupWord).filter(Boolean),
    phrase: state.words.phrase.map(lookupWord).filter(Boolean)
  };
}

export default connect(select)(Spaces);
