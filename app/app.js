import _map from 'lodash.map';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { routerStateReducer, reduxReactRouter } from 'redux-router';
import { createHistory } from 'history';
import Firebase from 'firebase';

import config from '../config';
import { words, creation, user as userReducer, phrases, activePhraseIndex, people } from './lib/reducers';
import { isPlaying } from './lib/reducers/isPlaying';
import Routes from './lib/Routes';

const reducer = combineReducers({
  router: routerStateReducer,
  words,
  creation,
  user: userReducer,
  phrases,
  activePhraseIndex,
  people,
  isPlaying
});

const store = reduxReactRouter({ createHistory })(createStore)(reducer);

const firebase = new Firebase(`https://${config.firebaseApp}.firebaseio.com`);

// try to get the logged in user from firebase, add to store
firebase.onAuth((authData) => {
  if (authData) {
    const user = {
      id: authData.uid,
      provider: authData.provider,
      name: authData.github.displayName,
      image: authData.github.profileImageURL
    };
    store.dispatch({
      type: 'ADD_USER',
      user: user
    });
    firebase.child('users').child(authData.uid).set(user);
  }
});

// load phrases from firebase
firebase.child('phrases').once('value', (data) => {
  store.dispatch({
    type: 'ADD_PHRASES',
    phrases: _map(data.val(), (p) => {
      return p;
    })
  });
});

// load words from firebase
firebase.child('words').once('value', (data) => {
  const fwords = data.val();
  store.dispatch({
    type: 'ADD_WORDS',
    words: _map(fwords, (w, id) => {
      return {
        id: id,
        text: w.text
      };
    })
  });
});

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<Routes store={store} />, document.getElementById('root'));
});
