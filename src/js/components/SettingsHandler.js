import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Settings from './Settings';

class SettingsHandler extends Component {

  render() {
    const { settings, words, dispatch } = this.props;

    return (
      <Settings settings={settings} words={words} dispatch={dispatch} />
    );
  }

}

SettingsHandler.propTypes = {
  settings: PropTypes.object,

  words: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired).isRequired,

  dispatch: PropTypes.func.isRequired
};

export default connect(state => {
  return {
    settings: state.settings,
    words: state.words
  };
})(SettingsHandler);
