import React, { Component, PropTypes } from 'react';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import TextField from 'material-ui/lib/text-field';
import IconButton from 'material-ui/lib/icon-button';
import Firebase from 'firebase';

import Word from '../Word/Word';
import config from '../../../config';

import styles from './Settings.css';

export default class Settings extends Component {

  render() {
    const { words } = this.props;

    return (
      <Tabs>

        <Tab label="Add words">

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

        </Tab>

        <Tab label="Your phrases"></Tab>

      </Tabs>
    );
  }

  addWords() {
    const firebase = new Firebase(`https://${config.firebaseApp}.firebaseio.com`);

    // push words to the store one by one because we need the firebase ID that is created
    // as a result of firebase.push
    this.refs.newwords.getValue().split('\n').filter((word) => {
      // remove empty strings
      return word;
    }).forEach((word) => {
      this.props.dispatch({
        type: 'ADD_WORD',
        id: firebase.push({text: word}).key(),
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
  settings: PropTypes.object,

  words: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired).isRequired,

  dispatch: PropTypes.func.isRequired,

  history: PropTypes.object.isRequired
};
