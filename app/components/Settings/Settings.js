import React, { Component, PropTypes } from 'react';
import Divider from 'material-ui/lib/divider';
import TextField from 'material-ui/lib/text-field';
import IconButton from 'material-ui/lib/icon-button';
import FontIcon from 'material-ui/lib/font-icon';
import RaisedButton from 'material-ui/lib/raised-button';
import colors from 'material-ui/lib/styles/colors';
import Firebase from 'firebase';

import Word from '../Word/Word';
import config from '../../../config';

import styles from './Settings.css';

export default class Settings extends Component {

  constructor() {
    super(...arguments);
    this.firebase = new Firebase(`https://${config.firebaseApp}.firebaseio.com`);
  }

  render() {
    const { words, user, phrases } = this.props;

    return (
      <div>
        <div className={styles.heading}>Available words</div>

        <div className={styles.wordGroup}>
          {words.slice(0).sort((a, b) => {
            return a.text > b.text ? 1 : (a.text < b.text ? -1 : 0);
          }).map(function (word) {
            return <div className={styles.word} key={word.id}><Word text={word.text} /></div>;
          })}
        </div>

        <div className={styles.addWords}>
          <TextField floatingLabelText="Add words separated by newlines" multiLine={true} ref="newwords" />
          <IconButton iconClassName="material-icons" tooltip="Save" style={{display: "block"}} onClick={() => {
            this.addWords();
          }}>done</IconButton>
        </div>

        <Divider/>

        <div className={styles.heading}>Your phrases</div>
        <div className={styles.wordGroup}>
        {
          phrases.filter((phrase) => {
            return phrase.user === user.id;
          }).map((phrase, i) => {
            return (
              <div className={styles.phrase} key={i}>
              <RaisedButton style={{float: 'left', height: 24, minWidth: 56, marginRight: 12}} backgroundColor={colors.grey100} tooltip="Delete" onClick={() => {
                this.deletePhrase(phrase.id);
              }}>
                <FontIcon className="material-icons" color={colors.grey400} hoverColor={colors.red300}>delete</FontIcon>
              </RaisedButton>
              {
                phrase.words.map((w) => {
                  const ww = words.find((word) => {
                    return word.id === w;
                  });
                  return ww && (
                    <div className={styles.word} key={ww.id}><Word text={ww.text} /></div>
                  );
                })
              }
              </div>
            );
          })
        }
        </div>
      </div>
    );
  }

  deletePhrase(id) {
    this.firebase.child('phrases').child(id).remove((err) => {
      if (err) {
        throw err;
      }
      this.props.dispatch({type: 'PHRASE_REMOVE', id});
    });
  }

  addWords() {

    // push words to the store one by one because we need the firebase ID that is created
    // as a result of firebase.push
    this.refs.newwords.getValue().split('\n').filter((word) => {
      // remove empty strings
      return word;
    }).forEach((word) => {
      this.props.dispatch({
        type: 'ADD_WORD',
        id: this.firebase.child('words').push({text: word}).key(),
        text: word
      });
    });

    // clear TextField
    this.refs.newwords.clearValue();

    // redirect to view phrases page
    this.props.history.push("/");
  }
}

Settings.propTypes = {
  user: PropTypes.object.isRequired,

  phrases: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    date: PropTypes.number.isRequired,
    user: PropTypes.string.isRequired,
    words: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
  }).isRequired).isRequired,

  settings: PropTypes.object,

  words: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired).isRequired,

  dispatch: PropTypes.func.isRequired,

  history: PropTypes.object.isRequired
};
