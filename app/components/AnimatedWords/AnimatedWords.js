import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import _debounce from 'lodash.debounce';

import Word from '../Word/Word';

import styles from './AnimatedWords.css';

export default class AnimatedWords extends Component {

  constructor() {
    super(...arguments);

    this.wordSpacing = 5;
    this.rowHeight = 30;
    this.gapRows = 6;

    this.wordRefs = {};

    this.debouncedUpdatePositions = _debounce(this.updatePositions, 500).bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.debouncedUpdatePositions);
    this.updatePositions();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.debouncedUpdatePositions);
  }

  componentDidUpdate() {
    this.updatePositions();
  }

  updatePositions() {
    const {
        phrases,
        words,
        activePhraseIndex
      } = this.props,
      activePhrase = phrases.length ? phrases[activePhraseIndex] : { words: [] },
      containerWidth = this.refs.words.offsetWidth,
      // const doesn't mean that we won't mutate the value, only that the variable identifier will not reassigned
      unusedWordRefs = words.filter((w) => {
        return !activePhrase.words.find((wid) => {
          return wid === w.id;
        });
      }).map((w) => {
        return this.wordRefs[w.id];
      });

    // sort unused words alphabetically
    unusedWordRefs.sort((a, b) => {
      if (a.props.text < b.props.text) {
        return -1;
      }
      if (a.props.text > b.props.text) {
        return 1;
      }
      return 0;
    });

    let xCursor = 0,
      row = 0;

    unusedWordRefs.forEach((wordRef) => {
      const wordEl = ReactDOM.findDOMNode(wordRef);
      if (wordEl) {
        if (xCursor + wordEl.offsetWidth > containerWidth) {
          xCursor = 0;
          row += 1;
        }
        wordEl.style.left = xCursor + 'px';
        wordEl.style.top = row * this.rowHeight + 'px';
        xCursor = xCursor + wordEl.offsetWidth + this.wordSpacing;
      }
    });

    xCursor = 0;
    row += this.gapRows;

    activePhrase.words.forEach((wordId) => {
      const wordEl = ReactDOM.findDOMNode(this.wordRefs[wordId]);
      if (wordEl) {
        if (xCursor + wordEl.offsetWidth > containerWidth) {
          xCursor = 0;
          row += 1;
        }
        wordEl.style.left = xCursor + 'px';
        wordEl.style.top = row * this.rowHeight + 'px';
        xCursor = xCursor + wordEl.offsetWidth + this.wordSpacing;
      }
    });

    row += 1;

    this.refs.words.style.minHeight = (this.rowHeight * row) + 'px';

  }

  render() {
    const { words } = this.props;

    return (
      <div className={styles.root} ref="words">
        {
          words.slice(0).sort((a, b) => {
            return a.text > b.text ? 1 : (a.text < b.text ? -1 : 0);
          }).map((word) => {
            return <Word key={word.id} id={word.id} text={word.text} animated={true} ref={(ref) => {
              if (ref) {
                this.wordRefs[ref.props.id] = ref;
              }
            }} />;
          })
        }
      </div>
    );
  }

}

AnimatedWords.propTypes = {

  words: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired).isRequired,

  phrases: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.number.isRequired,
    user: PropTypes.string.isRequired,
    words: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
  }).isRequired).isRequired,

  activePhraseIndex: PropTypes.number.isRequired,

  dispatch: PropTypes.func.isRequired

};
