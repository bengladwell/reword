import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Settings from '../components/Settings/Settings';

class SettingsHandler extends Component {

  render() {
    const { user, phrases, settings, words, dispatch, history } = this.props;

    return (
      <Settings
        user={user}
        phrases={phrases}
        settings={settings}
        words={words}
        dispatch={dispatch}
        history={history}
      />
    );
  }

}

SettingsHandler.propTypes = {
  settings: PropTypes.object,

  user: PropTypes.object.isRequired,

  phrases: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    date: PropTypes.number.isRequired,
    user: PropTypes.string.isRequired,
    words: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
  }).isRequired).isRequired,

  words: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired).isRequired,

  dispatch: PropTypes.func.isRequired
};

export default connect(state => {
  return {
    user: state.user,
    phrases: state.phrases,
    settings: state.settings,
    words: state.words
  };
})(SettingsHandler);
