import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/lib/flat-button';
import { Link } from 'react-router';

import AnimatedWords from '../components/AnimatedWords/AnimatedWords';
import CreatorInfo from '../components/CreatorInfo/CreatorInfo';
import PhraseChanger from '../components/PhraseChanger/PhraseChanger';
import PlayStopButton from '../components/PlayStopButton/PlayStopButton';

class ViewHandler extends Component {

  render() {
    const {
      words,
      phrases,
      activePhraseIndex,
      user,
      people,
      isPlaying,
      dispatch
      } = this.props;

    return (
      <div>
        <AnimatedWords words={words} phrases={phrases} activePhraseIndex={activePhraseIndex} dispatch={dispatch} />

        <CreatorInfo phrases={phrases} activePhraseIndex={activePhraseIndex} people={people} dispatch={dispatch} />

        <PhraseChanger phrases={phrases} activePhraseIndex={activePhraseIndex} dispatch={dispatch} />

        <PlayStopButton isPlaying={isPlaying} phrases={phrases} activePhraseIndex={activePhraseIndex} dispatch={dispatch} />

        {user ? <Link to="/create">
          <FlatButton
            label="Create New Phrase"
            backgroundColor="#FFF"
            secondary={true}
            style={{marginTop: 20}}
            labelStyle={{padding: "0 10px"}}
          />
        </Link> : ''}
      </div>
    );
  }

}

ViewHandler.propTypes = {

  words: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired).isRequired,

  phrases: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
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

  isPlaying: PropTypes.bool.isRequired,

  dispatch: PropTypes.func.isRequired

};

export default connect(state => {
  return {
    words: state.words,
    phrases: state.phrases,
    activePhraseIndex: state.activePhraseIndex,
    user: state.user,
    people: state.people,
    isPlaying: state.isPlaying
  };
})(ViewHandler);
