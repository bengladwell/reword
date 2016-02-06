import React, { Component, PropTypes } from 'react';
import { DragDropContext as ddContext } from 'react-dnd';
import { Link } from 'react-router';
import HTML5Backend from 'react-dnd-html5-backend';
import FlatButton from 'material-ui/lib/flat-button';
import Firebase from 'firebase';

import DraggableWord from '../DraggableWord/DraggableWord';
import WordDropZone from '../WordDropZone/WordDropZone';
import config from '../../../config';

import styles from './CreatePhrase.css';

class CreatePhrase extends Component {
  componentDidMount() {
    this.init(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.init(nextProps);
  }

  init(props) {
    const {
        words,
        creation,
        dispatch
      } = props;

    if (words.length && !creation.available.length && !creation.phrase.length) {
      dispatch({
        type: 'CREATION_INIT',
        words: words
      });
    }
  }

  submitPhrase() {
    const { creation, authuser, history, dispatch } = this.props,
      { phrase } = creation,
      firebase = new Firebase(`https://${config.firebaseApp}.firebaseio.com`);

    // push phrase to the store
    if (phrase.length) {
      let entity = firebase.child('phrases').push({
        user: authuser.id,
        date: Date.now(),
        words: phrase
      });

      dispatch({
        type: 'PHRASE_ADD',
        id: entity.key(),
        user: authuser.id,
        date: entity.val().date,
        words: phrase
      });

      // redirect back to the view phrase page
      history.push("/");
    }

  }

  render() {
    const { words, creation } = this.props,
      { available, phrase } = creation;

    return (
      <div>

        <div ref="available" className={styles.wordGroup}>

          {
            available.map((id) => {
              return words.find((w) => {
                return w.id === id;
              });
            }).sort((a, b) => {
              return a.text > b.text ? 1 : (a.text < b.text ? -1 : 0);
            }).map(function (word, i) {

              return <div key={word.id}>
                <WordDropZone index={i} space="AVAILABLE" />
                <DraggableWord id={word.id} index={i} text={word.text} />
              </div>;

            })
          }
          <WordDropZone index={available.length} space="AVAILABLE" isLast={true} />

        </div>

        <div ref="phrase" className={styles.phrase}>

          {
            phrase.map((id, i) => {
              const word = words.find((w) => w.id === id);

              return <div key={word.id}>
                <WordDropZone index={i} space="PHRASE" />
                <DraggableWord id={word.id} index={i} text={word.text} />
              </div>;

            })
          }
          <WordDropZone index={phrase.length} space="PHRASE" isLast={true} />

        </div>

        <FlatButton label="Save" backgroundColor="#FFF" secondary={true} onClick={this.submitPhrase.bind(this)} />

        <Link to="/"><FlatButton label="Cancel" backgroundColor="#FFF" secondary={true} /></Link>

      </div>
    );
  }

}

CreatePhrase.propTypes = {

  words: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired).isRequired,

  creation: PropTypes.shape({
    available: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    phrase: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
  }).isRequired,

  authuser: PropTypes.object,

  dispatch: PropTypes.func.isRequired,

  history: PropTypes.object.isRequired

};

export default ddContext(HTML5Backend)(CreatePhrase);
