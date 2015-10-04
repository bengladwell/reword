import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { moveWord } from '../actions';
import AppBar from 'material-ui/lib/app-bar';
import AvailableWords from './AvailableWords';
import WordGroup from './WordGroup';
import Theme from '../Theme';

import ThemeManager from 'material-ui/lib/styles/theme-manager';
import Colors from 'material-ui/lib/styles/colors';

class App extends Component {
  getChildContext() {
    var theme = ThemeManager.getMuiTheme(Theme);
    theme.appBar.textColor = Colors.lightBlack;
    return {
      muiTheme: theme
    };
  }

  render() {
    // injected by connect()
    const { dispatch, availableWords, phraseWords } = this.props;
    return (
      <div className="app">
        <AppBar title="quip" showMenuIconButton={false}/>
        <AvailableWords
          words={availableWords}
          onMoveWord={(word, space) =>
            dispatch(moveWord(word, space))
          }
        />
        <WordGroup words={phraseWords} ref="phrase"/>
      </div>
    );
  }
}

App.childContextTypes = {
  muiTheme: React.PropTypes.object
};

App.propTypes = {
  availableWords: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired).isRequired,
  phraseWords: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired).isRequired
};

function select(state) {
  let lookupWord = function (id) {
    let word = state.words.find(function (w) {
      return w.id === id;
    });
    return word;
  };
  return {
    availableWords: state.availableWords.map(lookupWord).filter(Boolean),
    phraseWords: state.phraseWords.map(lookupWord).filter(Boolean)
  };
}

export default connect(select)(App);
