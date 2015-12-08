import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Slider from 'material-ui/lib/slider';
import FlatButton from 'material-ui/lib/flat-button';
import CircularProgress from 'material-ui/lib/circular-progress';
import Avatar from 'material-ui/lib/avatar';
import { Link } from 'react-router';
import Firebase from 'firebase';

import Word from './Word';

import styles from '../../css/components/view-phrase.css';

class ViewPhrase extends Component {

  componentDidUpdate(prevProps) {
    const person = this.context.store.getState().people[prevProps.personId];
    if (!person) {
      this.getPerson(prevProps.personId);
    }
  }

  render() {
    const {
        available,
        phrase,
        phraseIndex,
        phraseCount,
        authuser,
        personId
      } = this.props,
      { store } = this.context,
      person = store.getState().people[personId];

    return (
      <div className={styles.root}>
        <div ref="available" className={styles.wordGroup}>
          {available.map(function (word) {
            return <Word key={word.id} text={word.text} />;
          })}
        </div>
        {
          person ?
              <div className={styles.person}>
                <span className={styles.createdBy}>Phrase by</span>
                <Avatar src={person.image} style={{verticalAlign: "middle", marginRight: '4px'}}/>
                {person.name}
              </div>
            : <CircularProgress mode="indeterminate" size={0.5}/>
        }
        <div ref="phrase" className={styles.phrase}>
          {phrase.map(function (word) {
            return <Word key={word.id} text={word.text} />;
          })}
        </div>
        {
          phraseCount ?
            <Slider
              className={styles.slider}
              name="phrase"
              max={phraseCount - 1}
              step={1}
              value={phraseIndex}
              description="Slide to see more phrases"
              onChange={(e, v) => {
                store.dispatch({
                  type: 'CHANGE_PHRASE',
                  index: v
                });
              }}
            />
          : null
        }
        {authuser ? <Link to="/create"><FlatButton label="Create New Phrase" backgroundColor="#FFF" secondary={true} /></Link> : ''}
      </div>
    );
  }

  getPerson(id) {
    new Firebase('https://reword.firebaseio.com').child('users/' + id).once('value', (data) => {
      const personData = data.val();
      if (personData) {
        this.context.store.dispatch({
          type: 'ADD_PERSON',
          id: id,
          name: personData.name,
          image: personData.image
        });
      }
    });
  }

}

ViewPhrase.contextTypes = {
  store: PropTypes.object
};

ViewPhrase.propTypes = {

  available: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired).isRequired,

  phrase: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired).isRequired,

  authuser: PropTypes.object,

  personId: PropTypes.string,

  dateCreated: PropTypes.number,

  phraseIndex: PropTypes.number.isRequired,

  phraseCount: PropTypes.number.isRequired

};

export default connect(state => {
  if (!state.phrases[state.activePhrase]) {
    return {
      available: state.words.index,
      phrase: [],
      authuser: state.user,
      personId: null,
      dateCreated: null,
      phraseIndex: 0,
      phraseCount: 0
    };
  }

  let lookupWord = function (id) {
    let word = state.words.index.find(function (w) {
      return w.id === id;
    });
    return word;
  };

  return {
    available: state.words.index.filter((w) => {
      return !state.phrases[state.activePhrase].words.find((p) => {
        return w.id === p;
      });
    }),
    phrase: state.phrases[state.activePhrase].words.map(lookupWord).filter(Boolean),
    authuser: state.user,
    personId: state.phrases[state.activePhrase].user,
    dateCreated: state.phrases[state.activePhrase].date,
    phraseIndex: state.activePhrase,
    phraseCount: state.phrases.length
  };
})(ViewPhrase);
