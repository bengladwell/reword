import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import TextField from 'material-ui/lib/text-field';
import IconButton from 'material-ui/lib/icon-button';
import Firebase from 'firebase';

import Word from './Word';
import { addWord } from '../actions';

import styles from '../../css/components/settings.css';

const firebase = new Firebase('https://reword.firebaseio.com').child('words');

class Settings extends Component {

  render() {
    const { available } = this.props,
      { store } = this.context,
      addWords = () => {
        this.refs.newwords.getValue().split('\n').filter((word) => {
          // remove empty strings
          return word;
        }).forEach((word) => {
          store.dispatch(addWord(firebase.push({text: word}).key(), word));
        });
        this.refs.newwords.clearValue();
      };

    return (
      <div className={styles.root}>
        <Tabs>
          <Tab label="Add words">
            <div className={styles.heading}>Available words</div>
            <div ref="available" className={styles.wordGroup}>
              {available.map(function (word) {
                return <Word key={word.id} text={word.text} />;
              })}
            </div>
            <div className={styles.addWords}>
              <TextField floatingLabelText="Add words separated by newlines" multiLine={true} ref="newwords" />
              <IconButton iconClassName="material-icons" tooltip="Save" style={{display: "block"}} onClick={addWords}>done</IconButton>
            </div>
          </Tab>
          <Tab label="Your phrases"></Tab>
        </Tabs>
      </div>
    );
  }
}

Settings.contextTypes = {
  store: React.PropTypes.object
};

Settings.propTypes = {
  settings: PropTypes.any.isRequired,
  available: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired).isRequired
};

export default connect(state => {
  let lookupWord = function (id) {
    let word = state.words.index.find(function (w) {
      return w.id === id;
    });
    return word;
  };
  return {
    settings: state.settings || {},
    available: state.words.available.map(lookupWord).filter(Boolean)
  };
})(Settings);
