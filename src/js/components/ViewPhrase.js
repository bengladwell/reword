import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
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

  constructor() {
    super();
    this.wordRefs = {};
  }

  componentDidUpdate(prevProps) {
    const {
        phrases,
        people,
        words
      } = prevProps,
      { activePhraseIndex } = this.props,
      activePhrase = phrases.length ? phrases[activePhraseIndex] : { words: [] },
      personId = activePhrase && activePhrase.user,
      person = phrases.length ? people[personId] : null,
      marginLeft = 5,
      rowHeight = 30,
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
      if (xCursor + wordEl.offsetWidth > containerWidth) {
        xCursor = 0;
        row += 1;
      }
      wordEl.style.left = xCursor + 'px';
      wordEl.style.top = row * rowHeight + 'px';
      xCursor = xCursor + wordEl.offsetWidth + marginLeft;
    });

    xCursor = 0;
    row += 1;

    activePhrase.words.forEach((wordId) => {
      const wordEl = ReactDOM.findDOMNode(this.wordRefs[wordId]);
      if (xCursor + wordEl.offsetWidth > containerWidth) {
        xCursor = 0;
        row += 1;
      }
      wordEl.style.left = xCursor + 'px';
      wordEl.style.top = row * rowHeight + 'px';
      xCursor = xCursor + wordEl.offsetWidth + marginLeft;
    });

    row += 1;

    this.refs.words.style.minHeight = (rowHeight * row) + 'px';

    // if we have not yet fetched and stored user info for the creator of this phrase, do it now
    if (!person) {
      this.getPerson(personId);
    }

  }

  // TODO: handle window resize

  getPerson(id) {
    // fetch user info for the user id and store it
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

  render() {
    const {
      words,
      phrases,
      activePhraseIndex,
      user,
      people,
      dispatch
      } = this.props,
      person = phrases.length && people[phrases[activePhraseIndex].user];

    return (
      <div className={styles.root}>

        <div className={styles.wordGroup} ref="words">
          {
            words.slice(0).sort((a, b) => {
              return a.text > b.text ? 1 : (a.text < b.text ? -1 : 0);
            }).map((word) => {
              return <Word key={word.id} id={word.id} text={word.text} ref={(ref) => {
                if (ref) {
                  this.wordRefs[ref.props.id] = ref;
                }
              }} />;
            })
          }
        </div>

        {
          // if we have user data for this person, display it; otherwise, show a progress indicator;
          // user data will be fetched and stored if it is missing, triggering a rerender
          person ?
              <div className={styles.person} ref="person" style={{position: 'relative'}}>
                <span className={styles.createdBy}>Phrase by</span>
                <Avatar src={person.image} style={{verticalAlign: "middle", marginRight: '4px'}}/>
                {person.name}
              </div>
            : <CircularProgress mode="indeterminate" size={0.5}/>
        }

        {
          phrases.length ?
            <Slider
              className={styles.slider}
              name="phrase"
              max={phrases.length - 1}
              step={1}
              value={activePhraseIndex}
              description="Slide to see more phrases"
              onChange={(e, v) => {
                dispatch({
                  type: 'CHANGE_PHRASE',
                  index: v
                });
              }}
            />
          : null
        }

        {user ? <Link to="/create"><FlatButton label="Create New Phrase" backgroundColor="#FFF" secondary={true} /></Link> : ''}
      </div>
    );
  }

}

ViewPhrase.contextTypes = {
  store: PropTypes.object
};

ViewPhrase.propTypes = {

  words: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired).isRequired,

  phrases: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.number.isRequired,
    user: PropTypes.string.isRequired,
    words: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
  }).isRequired).isRequired,

  user: PropTypes.object,

  people: PropTypes.objectOf(PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired),

  activePhraseIndex: PropTypes.number.isRequired,

  dispatch: PropTypes.func.isRequired

};

export default connect(state => {
  return {
    words: state.words,
    phrases: state.phrases,
    activePhraseIndex: state.activePhraseIndex,
    user: state.user,
    people: state.people
  };
})(ViewPhrase);
