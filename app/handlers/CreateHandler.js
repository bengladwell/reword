import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import CreatePhrase from '../components/CreatePhrase/CreatePhrase';

class CreateHandler extends Component {
  render() {
    const { words, creation, authuser, dispatch } = this.props;

    return (
      <CreatePhrase
        words={words}
        creation={creation}
        authuser={authuser}
        dispatch={dispatch}
      />
    );
  }

}

CreateHandler.contextTypes = {
  store: PropTypes.object
};

CreateHandler.propTypes = {

  words: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired).isRequired,

  creation: PropTypes.shape({
    available: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    phrase: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
  }).isRequired,

  authuser: PropTypes.object,

  dispatch: PropTypes.func.isRequired

};

export default connect((state) => {
  return {
    words: state.words,
    creation: state.creation,
    authuser: state.user
  };
})(CreateHandler);
