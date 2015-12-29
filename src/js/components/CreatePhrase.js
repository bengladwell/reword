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

  render() {
    const { words, creation, authuser, dispatch } = this.props,
      { available, phrase } = creation,
      firebase = new Firebase('https://reword.firebaseio.com');

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

        <FlatButton label="Save" backgroundColor="#FFF" secondary={true} onClick={() => {

          // push phrase to the store
          if (phrase.length) {
            let action = dispatch({
              type: 'ADD_PHRASE',
              user: authuser.id,
              date: Date.now(),
              words: phrase
            });

            // push phrase to firebase
            firebase.child('phrases').push({
              user: action.user,
              date: action.date,
              words: action.words
            });

            // redirect back to the view phrase page
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

  words: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired).isRequired,

  creation: PropTypes.shape({
    available: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    phrase: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
  }).isRequired,

  authuser: PropTypes.object
};

export default connect((state) => {
  return {
    words: state.words,
    creation: state.creation,
    authuser: state.user
  };
})(ddContext(HTML5Backend)(CreatePhrase));
