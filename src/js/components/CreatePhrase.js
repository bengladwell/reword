import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { DragDropContext as ddContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import FlatButton from 'material-ui/lib/flat-button';
import Firebase from 'firebase';

import DraggableWord from './DraggableWord';
import WordDropZone from './WordDropZone';

import styles from '../../css/components/create-phrase.css';

class CreatePhrase extends Component {
  render() {
    const { available, phrase, authuser } = this.props,
      { store } = this.context,
      firebase = new Firebase('https://reword.firebaseio.com');


    return (
      <div className={styles.root}>

        <div ref="available" className={styles.wordGroup}>
          {available.map(function (word, i) {
            return <div key={word.id}>
              <WordDropZone index={i} space="AVAILABLE" />
              <DraggableWord id={word.id} index={i} text={word.text} />
            </div>;
          })}
          <WordDropZone index={available.length} space="AVAILABLE" isLast={true} />
        </div>

        <div ref="phrase" className={styles.phrase}>
          {phrase.map(function (word, i) {
            return <div key={word.id}>
              <WordDropZone index={i} space="PHRASE" />
              <DraggableWord id={word.id} index={i} text={word.text} />
            </div>;
          })}
          <WordDropZone index={phrase.length} space="PHRASE" isLast={true} />
        </div>

        <FlatButton label="Save" backgroundColor="#FFF" secondary={true} onClick={() => {

          if (phrase.length) {
            let action = store.dispatch({
              type: 'ADD_PHRASE',
              user: authuser.id,
              date: Date.now(),
              words: phrase.map((word) => {
                return word.id;
              })
            });

            firebase.child('phrases').push({
              user: action.user,
              date: action.date,
              words: action.words
            });
            this.props.history.push("/");
          }

        }} />

        <Link to="/"><FlatButton label="Cancel" backgroundColor="#FFF" secondary={true} /></Link>

      </div>
    );
  }

}

CreatePhrase.contextTypes = {
  store: PropTypes.object
};

CreatePhrase.propTypes = {

  available: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired).isRequired,

  phrase: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired).isRequired,

  authuser: PropTypes.object
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
    phrase: state.words.phrase.map(lookupWord).filter(Boolean),
    authuser: state.user
  };
}

export default connect(select)(ddContext(HTML5Backend)(CreatePhrase));
