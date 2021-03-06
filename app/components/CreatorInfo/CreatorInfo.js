import React, { Component, PropTypes } from 'react';
import CircularProgress from 'material-ui/lib/circular-progress';
import Avatar from 'material-ui/lib/avatar';
import Firebase from 'firebase';

import config from '../../../config';

import styles from './CreatorInfo.css';

export default class CreatorInfo extends Component {

  constructor() {
    super(...arguments);
    this.firebase = new Firebase(`https://${config.firebaseApp}.firebaseio.com`);
  }

  componentDidUpdate() {
    const {
        phrases,
        people,
        activePhraseIndex
      } = this.props,
      activePhrase = phrases.length ? phrases[activePhraseIndex] : { words: [] },
      personId = activePhrase && activePhrase.user,
      person = phrases.length ? people[personId] : null;

    // if we have not yet fetched and stored user info for the creator of this phrase, do it now
    if (!person) {
      this.firebase.child('users/' + personId).once('value', this.addFirebasePerson.bind(this));
    }

  }

  addFirebasePerson(data) {
    const personData = data.val();
    if (personData) {
      this.props.dispatch({
        type: 'PERSON_ADD',
        id: data.key(),
        name: personData.name,
        image: personData.image
      });
    }
  }

  render() {
    const {
        phrases,
        people,
        activePhraseIndex
      } = this.props,
      person = phrases.length && people[phrases[activePhraseIndex].user];

    return (
      <div className={styles.root}>
        {
          // if we have user data for this person, display it; otherwise, show a progress indicator;
          // user data will be fetched and stored if it is missing, triggering a rerender
          person ?
              <div>
                <span className={styles.createdBy}>Phrase by</span>
                <Avatar src={person.image} style={{verticalAlign: "middle", marginRight: '4px'}}/>
                {person.name}
              </div>
            : <CircularProgress mode="indeterminate" size={0.5}/>
        }
      </div>
    );
  }

}

CreatorInfo.propTypes = {

  phrases: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    date: PropTypes.number.isRequired,
    user: PropTypes.string.isRequired,
    words: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
  }).isRequired).isRequired,

  activePhraseIndex: PropTypes.number.isRequired,

  people: PropTypes.objectOf(PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired),

  dispatch: PropTypes.func.isRequired

};
