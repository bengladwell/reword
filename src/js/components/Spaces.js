import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { DragDropContext as ddContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { Spaces as SpaceEnums } from '../actions';

import styles from '../../css/components/spaces.css';
import DraggableWord from './DraggableWord';
import WordDropZone from './WordDropZone';

class Spaces extends Component {
  render() {
    const { available, phrase } = this.props;
    return (
      <div className={styles.root}>
        <div ref="available" className={styles.wordGroup}>
          {available.map(function (word, i) {
            return <div key={word.id}>
              <WordDropZone index={i} space={SpaceEnums.AVAILABLE} />
              <DraggableWord id={word.id} index={i} text={word.text} />
            </div>;
          })}
          <WordDropZone index={available.length} space={SpaceEnums.AVAILABLE} isLast={true} />
        </div>
        <div ref="phrase" className={styles.phrase}>
          {phrase.map(function (word, i) {
            return <div key={word.id}>
              <WordDropZone index={i} space={SpaceEnums.PHRASE} />
              <DraggableWord id={word.id} index={i} text={word.text} />
            </div>;
          })}
          <WordDropZone index={phrase.length} space={SpaceEnums.PHRASE} isLast={true} />
        </div>
      </div>
    );
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

export default connect(select)(ddContext(HTML5Backend)(Spaces));
